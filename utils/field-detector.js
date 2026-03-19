/**
 * Logic to detect the type of field based on name, id, placeholder or label
 */

const fieldTypeMap = {
  name: ["nome", "name", "full_name", "full-name", "complete_name"],
  cpf: ["cpf", "document", "id_number"],
  cnpj: ["cnpj", "enterprise_id"],
  tel: ["tel", "phone", "celular", "whatsapp", "mobile"],
  email: ["email", "correio"]
};

export function detectFieldType(element) {
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
