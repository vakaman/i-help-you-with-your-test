// Content script for Data Gen Autofill

function setNativeValue(element, value) {
  const prototype = Object.getPrototypeOf(element);
  const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");
  const setter = descriptor?.set;

  if (setter) {
    setter.call(element, value);
  } else {
    element.value = value;
  }

  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
}

function detectFieldType(element) {
  const fieldTypeMap = {
    name: ["nome", "name", "full_name", "full-name", "complete_name"],
    cpf: ["cpf", "document", "id_number"],
    cnpj: ["cnpj", "enterprise_id"],
    tel: ["tel", "phone", "celular", "whatsapp", "mobile"],
    email: ["email", "correio"]
  };

  const searchableAttributes = [
    element.id,
    element.name,
    element.placeholder,
    element.getAttribute('aria-label')
  ].filter(Boolean).map(s => s.toLowerCase());

  // Check labels
  const labels = element.labels;
  if (labels) {
    for (const label of labels) {
      searchableAttributes.push(label.textContent.toLowerCase());
    }
  }

  for (const [type, keywords] of Object.entries(fieldTypeMap)) {
    if (keywords.some(keyword => searchableAttributes.some(attr => attr.includes(keyword)))) {
      return type;
    }
  }

  return null;
}

let bubble = null;
let activeElement = null;

function createBubble() {
  if (bubble) return;
  bubble = document.createElement('div');
  bubble.className = 'data-gen-bubble';
  bubble.innerHTML = `
    <div class="data-gen-bubble-icon" title="Data Gen Quick Fill">
      <img src="${chrome.runtime.getURL('icons/icon128.png')}" alt="Data Gen" width="16" height="16" style="display: block;" />
    </div>
  `;
  document.body.appendChild(bubble);

  bubble.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Prevent focus loss
  });

  bubble.querySelector('.data-gen-bubble-icon').addEventListener('click', (e) => {
    e.stopPropagation();
    showMenu();
  });
}

function showMenu() {
  const type = detectFieldType(activeElement);
  const menu = document.createElement('div');
  menu.className = 'data-gen-menu';

  // Add Title as requested
  const menuTitle = document.createElement('div');
  menuTitle.className = 'data-gen-menu-title';
  menuTitle.textContent = 'Preencher';
  menu.appendChild(menuTitle);

  const options = getOptionsForType(type);
  options.forEach(opt => {
    const item = document.createElement('div');
    item.className = 'data-gen-menu-item';
    item.textContent = opt.label;
    item.addEventListener('click', () => {
      chrome.runtime.sendMessage({
        type: 'GENERATE_DATA',
        payload: { type: type, variant: opt.variant }
      }, (response) => {
        if (response?.value) {
          setNativeValue(activeElement, response.value);
        }
      });
      menu.remove();
    });
    menu.appendChild(item);
  });

  bubble.appendChild(menu);

  // Recalculate position as the menu might be wider/taller
  positionBubble(activeElement);
}

function getOptionsForType(type) {
  switch (type) {
    case 'cpf':
      return [
        { label: 'Com máscara', variant: 'valid' },
        { label: 'Sem máscara', variant: 'raw' },
        { label: 'Inválido', variant: 'invalid' }
      ];
    case 'cnpj':
    case 'tel':
    case 'email':
      return [
        { label: 'Válido', variant: 'valid' },
        { label: 'Inválido', variant: 'invalid' }
      ];
    case 'name':
      return [
        { label: 'Válido (PF)', variant: 'pf-valid' },
        { label: 'Válido (PJ)', variant: 'pj-valid' },
        { label: 'Inválido - Pela metade', variant: 'pf-half' },
        { label: 'Inválido - Com número', variant: 'pf-number' },
        { label: 'Inválido - Especial', variant: 'pf-special' },
        { label: 'Inválido - Emoji', variant: 'pf-emoji' }
      ];
    default:
      return [
        { label: 'Válido', variant: 'valid' },
        { label: 'Inválido', variant: 'invalid' }
      ];
  }
}

function positionBubble(element) {
  const rect = element.getBoundingClientRect();
  bubble.style.display = 'block';
  const bubbleWidth = bubble.offsetWidth || 40;
  const bubbleHeight = bubble.offsetHeight || 40;

  // Vertical position: Prefer ABOVE, fallback to BELOW if no space
  let top = rect.top - bubbleHeight - 5;
  if (top < 0) {
    top = rect.bottom + 5;
  }
  bubble.style.top = `${window.scrollY + top}px`;

  // Horizontal position: Prefer RIGHT edge, shift LEFT if cut off
  let left = rect.right - bubbleWidth;

  // Ensure it doesn't go off the right edge of the window
  if (left + bubbleWidth > window.innerWidth - 10) {
    left = window.innerWidth - bubbleWidth - 10;
  }

  // Ensure it doesn't go off the left edge of the window
  if (left < 10) {
    left = 10;
  }

  bubble.style.left = `${window.scrollX + left}px`;
}

let originalAutocomplete = null;

document.addEventListener('focus', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    activeElement = e.target;
    const type = detectFieldType(activeElement);
    if (type) {
      // Temporarily disable native autocomplete to prevent overlap
      originalAutocomplete = activeElement.getAttribute('autocomplete');
      activeElement.setAttribute('autocomplete', 'off'); // Or 'new-password' for some sites

      createBubble();
      positionBubble(activeElement);
    } else {
      if (bubble) bubble.style.display = 'none';
    }
  }
}, true);

document.addEventListener('blur', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    // Restore original autocomplete on the specific element losing focus
    if (originalAutocomplete !== undefined) {
      if (originalAutocomplete === null) {
        e.target.removeAttribute('autocomplete');
      } else {
        e.target.setAttribute('autocomplete', originalAutocomplete);
      }
      originalAutocomplete = undefined;
    }
  }

  // Delay hide to allow menu clicks
  setTimeout(() => {
    if (bubble && document.activeElement !== activeElement) {
      bubble.style.display = 'none';
      const menu = bubble.querySelector('.data-gen-menu');
      if (menu) menu.remove();
    }
  }, 200);
}, true);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "FILL_FOCUSED_FIELD") {
    const active = document.activeElement;
    if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) {
      setNativeValue(active, message.payload?.value ?? "");
      sendResponse({ success: true });
      return;
    }
    sendResponse({ success: false });
  }
});