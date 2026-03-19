import { generators } from "./utils/generators.js";

const dataType = document.getElementById("dataType");
const generatedValue = document.getElementById("generatedValue");
const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");
const fillFocusedButton = document.getElementById("fillFocusedButton");
const status = document.getElementById("status");

function showStatus(text, duration = 2000) {
  status.textContent = text;
  status.classList.add("show");
  setTimeout(() => {
    status.classList.remove("show");
  }, duration);
}

const baseEmailInput = document.getElementById("baseEmail");
const useAliasCheckbox = document.getElementById("useAlias");
const formattedCheckbox = document.getElementById("formatted");

generateButton.addEventListener("click", () => {
  const type = dataType.value;
  const isFormatted = formattedCheckbox.checked;
  let value = "";

  switch (type) {
    case "fullName": value = generators.name(); break;
    case "cpf": value = generators.cpf({ formatted: isFormatted }); break;
    case "cnpj": value = generators.cnpj({ formatted: isFormatted }); break;
    case "tel": value = generators.phone(); break;
    case "email": 
      value = generators.email({ 
        baseEmail: baseEmailInput.value, 
        useAlias: useAliasCheckbox.checked 
      }); 
      break;
    default: value = generators.name();
  }

  generatedValue.value = value;
  chrome.storage.local.set({
    lastGeneratedType: type,
    lastGeneratedValue: value
  });
});

baseEmailInput.addEventListener("input", () => {
  chrome.storage.local.set({ baseEmail: baseEmailInput.value });
});

useAliasCheckbox.addEventListener("change", () => {
  chrome.storage.local.set({ useAlias: useAliasCheckbox.checked });
});

formattedCheckbox.addEventListener("change", () => {
  chrome.storage.local.set({ formatted: formattedCheckbox.checked });
});

copyButton.addEventListener("click", async () => {
  if (generatedValue.value) {
    await navigator.clipboard.writeText(generatedValue.value);
    showStatus("Copiado com sucesso!");
  }
});

fillFocusedButton.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  if (!tab?.id || !generatedValue.value) {
    return;
  }

  await chrome.tabs.sendMessage(tab.id, {
    type: "FILL_FOCUSED_FIELD",
    payload: {
      value: generatedValue.value
    }
  });
  showStatus("Campo preenchido!");
});

// Load last generated value and settings
chrome.storage.local.get(["lastGeneratedType", "lastGeneratedValue", "baseEmail", "useAlias", "formatted"], (result) => {
  if (result.lastGeneratedType) dataType.value = result.lastGeneratedType;
  if (result.lastGeneratedValue) generatedValue.value = result.lastGeneratedValue;
  if (result.baseEmail) baseEmailInput.value = result.baseEmail;
  if (result.useAlias !== undefined) useAliasCheckbox.checked = result.useAlias;
  if (result.formatted !== undefined) formattedCheckbox.checked = result.formatted;
});