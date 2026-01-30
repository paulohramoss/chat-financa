/**
 * Parser de mensagens em linguagem natural para extrair informações de transações
 */

/**
 * Palavras-chave que indicam receita
 */
const incomeKeywords = [
  "recebi",
  "receber",
  "receita",
  "ganho",
  "ganhei",
  "salário",
  "salario",
  "pagamento",
  "entrada",
  "transferência recebida",
  "freelance",
  "bônus",
  "bonus",
];

/**
 * Palavras-chave que indicam despesa
 */
const expenseKeywords = [
  "gastei",
  "gastar",
  "comprei",
  "compra",
  "paguei",
  "pagar",
  "despesa",
  "saída",
  "transferência",
  "transferencia",
];

/**
 * Categorias e suas palavras-chave
 */
const categoryKeywords = {
  alimentação: [
    "mercado",
    "supermercado",
    "restaurante",
    "lanche",
    "comida",
    "almoço",
    "jantar",
    "café",
    "padaria",
    "pizza",
    "hamburguer",
  ],
  transporte: [
    "uber",
    "taxi",
    "99",
    "gasolina",
    "combustível",
    "ônibus",
    "onibus",
    "metrô",
    "metro",
    "estacionamento",
  ],
  saúde: [
    "farmácia",
    "farmacia",
    "médico",
    "medico",
    "hospital",
    "consulta",
    "remédio",
    "remedio",
    "exame",
  ],
  educação: [
    "curso",
    "escola",
    "faculdade",
    "livro",
    "apostila",
    "mensalidade",
  ],
  lazer: [
    "cinema",
    "jogo",
    "show",
    "teatro",
    "viagem",
    "streaming",
    "netflix",
    "spotify",
  ],
  moradia: [
    "aluguel",
    "condomínio",
    "condominio",
    "água",
    "agua",
    "luz",
    "energia",
    "internet",
    "gás",
    "gas",
  ],
  vestuário: [
    "roupa",
    "sapato",
    "tênis",
    "tenis",
    "camisa",
    "calça",
    "calca",
    "loja",
  ],
  salário: ["salário", "salario", "pagamento", "holerite"],
  freelance: ["freelance", "freela", "bico"],
  investimentos: [
    "investimento",
    "ação",
    "acao",
    "renda fixa",
    "tesouro",
    "cdb",
  ],
  presentes: ["presente", "gift", "aniversário", "aniversario"],
};

/**
 * Extrair valor monetário da mensagem
 */
function extractAmount(message) {
  // Padrões para valores monetários
  const patterns = [
    /R\$?\s*(\d+(?:[.,]\d{1,2})?)/i, // R$ 50.00 ou R$ 50,00
    /(\d+(?:[.,]\d{1,2})?)\s*reais?/i, // 50 reais
    /(\d+(?:[.,]\d{1,2})?)\s*r\$/i, // 50 R$
    /(\d+(?:[.,]\d{1,2})?)/, // 50
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match) {
      // Converter vírgula para ponto e parsear
      const value = parseFloat(match[1].replace(",", "."));
      if (!isNaN(value) && value > 0) {
        return value;
      }
    }
  }

  return null;
}

/**
 * Detectar tipo de transação (receita ou despesa)
 */
function detectTransactionType(message) {
  const lowerMessage = message.toLowerCase();

  // Verificar palavras-chave de receita
  for (const keyword of incomeKeywords) {
    if (lowerMessage.includes(keyword)) {
      return "income";
    }
  }

  // Verificar palavras-chave de despesa
  for (const keyword of expenseKeywords) {
    if (lowerMessage.includes(keyword)) {
      return "expense";
    }
  }

  // Por padrão, assumir despesa (mais comum)
  return "expense";
}

/**
 * Detectar categoria da transação
 */
function detectCategory(message) {
  const lowerMessage = message.toLowerCase();

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        return category;
      }
    }
  }

  return "outros";
}

/**
 * Extrair descrição da mensagem (removendo valor e palavras-chave)
 */
function extractDescription(message, amount) {
  let description = message;

  // Remover valor monetário
  description = description.replace(/R\$?\s*\d+(?:[.,]\d{1,2})?/gi, "");
  description = description.replace(/\d+(?:[.,]\d{1,2})?\s*reais?/gi, "");

  // Remover palavras-chave de ação
  const actionWords = [...incomeKeywords, ...expenseKeywords];
  for (const word of actionWords) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    description = description.replace(regex, "");
  }

  // Limpar espaços extras
  description = description.trim().replace(/\s+/g, " ");

  // Se a descrição ficou vazia, usar categoria
  if (!description) {
    description = "Transação";
  }

  return description;
}

/**
 * Parser principal - converte mensagem em dados estruturados de transação
 */
export function parseTransaction(message) {
  if (!message || typeof message !== "string") {
    return null;
  }

  const amount = extractAmount(message);

  // Se não conseguiu extrair valor, não é uma transação válida
  if (!amount) {
    return null;
  }

  const type = detectTransactionType(message);
  const category = detectCategory(message);
  const description = extractDescription(message, amount);

  return {
    amount,
    type,
    category,
    description,
    date: new Date(),
  };
}

/**
 * Verificar se a mensagem parece ser uma transação
 */
export function isTransactionMessage(message) {
  if (!message || typeof message !== "string") {
    return false;
  }

  // Verificar se tem um valor monetário
  const hasAmount = extractAmount(message) !== null;

  // Verificar se não é um comando
  const isCommand = message.trim().startsWith("/");

  return hasAmount && !isCommand;
}
