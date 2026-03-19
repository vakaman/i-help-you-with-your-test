import { generators } from "./utils/generators.js";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "data-gen-main",
    title: "Generate Data",
    contexts: ["editable"]
  });

  const menus = [
    { id: "name", title: "Nome Completo" },
    { id: "cpf", title: "CPF" },
    { id: "cnpj", title: "CNPJ" },
    { id: "tel", title: "Telefone (E.164)" },
    { id: "email", title: "Email" }
  ];

  menus.forEach(menu => {
    chrome.contextMenus.create({
      id: `data-gen-${menu.id}`,
      parentId: "data-gen-main",
      title: menu.title,
      contexts: ["editable"]
    });

    if (menu.id === 'cpf') {
      chrome.contextMenus.create({
        id: "data-gen-cpf-masked",
        parentId: `data-gen-cpf`,
        title: "Com Máscara",
        contexts: ["editable"]
      });
      chrome.contextMenus.create({
        id: "data-gen-cpf-raw",
        parentId: `data-gen-cpf`,
        title: "Sem Máscara",
        contexts: ["editable"]
      });
    }
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const parts = info.menuItemId.split('-');
  const type = parts[2];
  const variant = parts[3];

  if (type && generators[type]) {
    let value = "";
    if (type === 'cpf') {
      value = generators.cpf({ formatted: variant === 'masked' });
    } else {
      value = generators[type]();
    }

    chrome.tabs.sendMessage(tab.id, {
      type: "FILL_FOCUSED_FIELD",
      payload: { value }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GENERATE_DATA') {
    const { type, variant } = message.payload;
    let value = '';
    
    switch (type) {
      case 'cpf':
        value = generators.cpf({ 
          valid: variant !== 'invalid', 
          formatted: variant !== 'raw' 
        });
        break;
      case 'cnpj':
        value = generators.cnpj({ valid: variant === 'valid' });
        break;
      case 'name': {
        const parts = variant.split('-');
        const nameType = parts[0] === 'pj' ? 'pj' : 'pf';
        const nameVariant = parts[1] || 'valid';
        value = generators.name({ 
          type: nameType,
          variant: nameVariant
        });
        break;
      }
      case 'tel':
        value = generators.phone({ type: variant, international: true });
        break;
      case 'email':
        chrome.storage.local.get(['baseEmail', 'useAlias'], (result) => {
          const value = generators.email({ 
            valid: variant === 'valid',
            baseEmail: result.baseEmail || "",
            useAlias: result.useAlias || false
          });
          sendResponse({ value });
        });
        return true; // Keep message channel open for async response
      default:
        value = generators.name(); // Fallback
    }

    sendResponse({ value });
    return true;
  }
});
