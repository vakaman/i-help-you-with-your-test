const firstNames = [
  "Adriana", "Adriano", "Alan", "Alberto", "Alessandra", "Alessandro", "Alex", "Alexandre", "Alice", "Aline",
  "Amanda", "Ana", "Anderson", "André", "Andréia", "Angela", "Antônia", "Antônio", "Aparecida", "Arthur",
  "Beatriz", "Benedito", "Bianca", "Bruna", "Bruno", "Caio", "Camila", "Carla", "Carlos", "Carolina",
  "Caroline", "Cássia", "Cecília", "Celso", "César", "Christian", "Cláudia", "Cláudio", "Cleide", "Cristiane",
  "Cristiano", "Cristina", "Daiane", "Daniel", "Daniela", "Danielle", "Danilo", "Davi", "Débora", "Denise",
  "Diego", "Diogo", "Douglas", "Edilson", "Edina", "Edson", "Eduardo", "Elaine", "Eliana", "Eliane",
  "Elias", "Elisângela", "Elizabete", "Érica", "Estevan", "Evelyn", "Fabiana", "Fabiano", "Fábio", "Fabrícia",
  "Fabrício", "Felipe", "Fernanda", "Fernando", "Flávia", "Flávio", "Franciele", "Francisco", "Gabriel", "Gabriela",
  "Gelson", "Geraldo", "Gerson", "Gilberto", "Giovana", "Gisele", "Gláucia", "Guilherme", "Gustavo", "Heloísa",
  "Henrique", "Hugo", "Iara", "Igor", "Inês", "Isabel", "Isadora", "Ivan", "Ivone", "Izabel",
  "Jacqueline", "Jader", "Jaime", "Jair", "Janaina", "Jane", "Jaqueline", "Jean", "Jéssica", "Joana",
  "João", "Joaquim", "Joelma", "Jonas", "Jonathan", "Jorge", "José", "Josiane", "Josué", "Joyce",
  "Júlia", "Juliana", "Juliano", "Júlio", "Junior", "Jussara", "Karen", "Karina", "Karine", "Katia"
];

const lastNames = [
  "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes",
  "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa",
  "Rocha", "Dias", "Nascimento", "Andrade", "Moreira", "Nunes", "Marques", "Machado", "Mendes", "Freitas",
  "Cardoso", "Ramos", "Gonçalves", "Santana", "Teixeira", "Castro", "Pinheiro", "Borges", "Prudente", "Viana",
  "Falcão", "Araújo", "Monteiro", "Guimarães", "Pires", "Fonseca", "Barros", "Cavalcanti", "Paiva", "Dantas",
  "Magalhães", "Rezende", "Bittencourt", "Siqueira", "Farias", "Nogueira", "Aguiar", "Arruda", "Assis", "Batista",
  "Bezerra", "Brandão", "Brito", "Cabral", "Caldeira", "Camargo", "Campos", "Capistrano", "Carneiro", "Chaves",
  "Coelho", "Correia", "Cunha", "Damasceno", "Duarte", "Escobar", "Esteves", "Faria", "Fausto", "Felício",
  "Figueiredo", "Filgueira", "Fleury", "Franco", "Frota", "Furtado", "Galvão", "Garcia", "Godoy", "Guedes",
  "Guerra", "Holanda", "Hortênsia", "Jales", "Jardim", "Lacerda", "Lira", "Loyola", "Luz", "Macedo",
  "Maia", "Maldonado", "Malta", "Marinho", "Meireles", "Melo", "Mesquita", "Miranda", "Moniz", "Moraes",
  "Moura", "Muniz", "Neves", "Nobre", "Ornellas", "Pacheco", "Padilha", "Pais", "Palmeira", "Paranhos"
];

const companyNames = [
  "Tech Solutions Ltda", "Global Services S.A.", "Mega Varejo Eireli", "Inovação Digital", "Brasil Logística", "Prisma Engenharia", "Fênix Consultoria",
  "Soluções Inovadoras", "Global Tech Sistemas", "Digital Brasil", "Inova Serviços", "Logística Express", "Engenharia Alpha", "Consultoria VIP",
  "Varejo Total", "Atacado Central", "Alimentos Sabor", "Bebidas Geladas", "Transportes Rápidos", "Tecnologia Avançada", "Sistemas Inteligentes",
  "Software Design", "Consultoria Master", "Group Brasil", "Investimentos S.A.", "Participações S.A.", "Holding Digital", "Importação Global",
  "Exportação Brasil", "Construções Sólidas", "Empreendimentos Novos", "Imobiliária Central", "Turismo Lazer", "Eventos Prime", "Comunicação Total",
  "Marketing Digital", "Publicidade Arte", "Design Studio", "Arquitetura Moderna", "Advocacia Unida", "Jurídico Express", "Contabilidade Master",
  "Auditoria Digital", "Saúde Total", "Medicina Avançada", "Odontologia Clean", "Estética Bela", "Fitness Center", "Academia Power",
  "Educação Moderna", "Escola Nova", "Curso Rápido", "Treinamento VIP", "Produções Filmes", "Artes Culturais", "Cultura Brasil",
  "Música Arte", "Esportes Total", "Lazer Família", "Viagens Sonho", "Hotelaria Prime", "Gastronomia Sabor", "Restaurante Bom",
  "Pizzaria Hot", "Padaria Pão", "Confeitaria Doce", "Açougue Carne", "Mercearia Bairro", "Supermercado Big", "Farmácia Vida",
  "Drogaria Saúde", "Ótica Visão", "Joalheria Brilho", "Vestuário Moda", "Moda Estilo", "Calçados Passo", "Acessórios Chique",
  "Cosméticos Pele", "Perfumaria Cheiro", "Limpeza Total", "Higiene Pura", "Brinquedos Divertidos", "Papelaria Oficina", "Livraria Saber",
  "Informática Central", "Celulares Tech", "Eletrônicos Casa", "Eletrodomésticos Novo", "Móveis Design", "Decoração Lar", "Iluminação Luz",
  "Tintas Cores", "Ferragens Fortes", "Ferramentas Pro", "Jardinagem Verde", "Petshop Amigo", "Veterinária Care", "Automóveis Turbo",
  "Peças Auto", "Oficina Mecânica", "Funilaria Pintura", "Vidraçaria Transparente", "Serralheria Ferro", "Marcenaria Madeira", "Gráfica Rápida",
  "Impressora Digital", "Brindes Personalizados", "Festas Eventos", "Buffet Sabor", "Decorações Festas", "Segurança Máxima", "Vigilância Privada",
  "Monitoramento Real", "Alarmes Fortes", "Ar Condicionado Frio", "Refrigeração Gelo", "Elétrica Luz", "Hidráulica Água", "Manutenção Geral"
];

const emojis = [
  "🚀", "🔥", "✨", "⭐", "💼", "🏢", "👤", "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉",
  "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒",
  "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵",
  "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮",
  "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺"
];

function randomDigit() {
  return Math.floor(Math.random() * 10);
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function calculateDigit(base, factor) {
  let total = 0;
  for (const digit of base) {
    total += parseInt(digit) * factor--;
  }
  const remainder = total % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export const generators = {
  /**
   * Generates a CPF
   */
  cpf: ({ valid = true, formatted = true } = {}) => {
    const base = Array.from({ length: 9 }, randomDigit).join("");
    let digit1, digit2;
    digit1 = calculateDigit(base, 10);
    digit2 = calculateDigit(`${base}${digit1}`, 11);
    
    if (!valid) {
      digit2 = (digit2 + 1) % 10; 
    }
    const cpf = `${base}${digit1}${digit2}`;
    return formatted ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : cpf;
  },

  /**
   * Generates a CNPJ
   */
  cnpj: ({ valid = true, formatted = true } = {}) => {
    const base = Array.from({ length: 12 }, randomDigit).join("");
    const calculateCnpjDigit = (base, factors) => {
      let total = 0;
      for (let i = 0; i < base.length; i++) {
        total += parseInt(base[i]) * factors[i];
      }
      const remainder = total % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };
    
    const factors1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const factors2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    let digit1 = calculateCnpjDigit(base, factors1);
    let digit2 = calculateCnpjDigit(base + digit1, factors2);

    if (!valid) {
      digit2 = (digit2 + 1) % 10;
    }
    const cnpj = `${base}${digit1}${digit2}`;
    return formatted ? cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") : cnpj;
  },

  /**
   * Generates a Name (PF or PJ)
   * variants: 'valid', 'half', 'number', 'special', 'emoji'
   */
  name: ({ type = 'pf', variant = 'valid' } = {}) => {
    let baseName = '';
    
    if (type === 'pj') {
      baseName = randomItem(companyNames);
    } else {
      const first = randomItem(firstNames);
      const last = randomItem(lastNames);
      baseName = variant === 'half' ? first : `${first} ${last}`;
    }

    switch(variant) {
      case 'number':
        return `${baseName} ${Math.floor(Math.random() * 100)}`;
      case 'special':
        return `${baseName.replace('a', '@').replace('e', '3')}#$!`;
      case 'emoji':
        return `${baseName} ${randomItem(emojis)}`;
      case 'half':
      case 'valid':
      default:
        return baseName;
    }
  },

  /**
   * Generates a Phone number
   * follows E.164 standard: +55 DDD 9XXXXXXXX
   */
  phone: ({ type = 'valid', formatted = true, international = true } = {}) => {
    const ddd = Math.floor(Math.random() * 89 + 11);
    const prefix = "9" + Array.from({ length: 4 }, randomDigit).join("");
    const suffix = Array.from({ length: 4 }, randomDigit).join("");
    
    if (type === 'short') return formatted ? `(${ddd}) ${prefix}` : `${ddd}${prefix}`;
    if (type === 'long') return formatted ? `(${ddd}) ${prefix}-${suffix}999` : `${ddd}${prefix}${suffix}999`;
    
    if (international) {
      return `+55${ddd}${prefix}${suffix}`;
    }

    return formatted ? `(${ddd}) ${prefix}-${suffix}` : `${ddd}${prefix}${suffix}`;
  },

  email: ({ valid = true, baseEmail = '', useAlias = false } = {}) => {
    if (!valid) {
      const invalidPatterns = [
        "meuemail.com",
        "@meuemail",
        ".com@meuemail",
        "email@dominio",
        "email..com@dominio.com"
      ];
      return randomItem(invalidPatterns);
    }

    if (useAlias && baseEmail && baseEmail.includes('@')) {
      const [user, domain] = baseEmail.split('@');
      const alias = Math.random().toString(36).substring(2, 7);
      return `${user}+${alias}@${domain}`;
    }

    const name = randomItem(firstNames).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return `${name}${Math.floor(Math.random() * 1000)}@example.com`;
  }
};
