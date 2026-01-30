import moment from "moment";

/**
 * Formatar valor monetário em Reais
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Formatar data
 */
export function formatDate(date) {
  return moment(date).format("DD/MM/YYYY");
}

/**
 * Formatar data e hora
 */
export function formatDateTime(date) {
  return moment(date).format("DD/MM/YYYY HH:mm");
}

/**
 * Formatar data relativa (hoje, ontem, etc)
 */
export function formatRelativeDate(date) {
  moment.locale("pt-br");
  return moment(date).calendar(null, {
    sameDay: "[Hoje]",
    lastDay: "[Ontem]",
    lastWeek: "dddd [passado]",
    sameElse: "DD/MM/YYYY",
  });
}

/**
 * Formatar tipo de transação
 */
export function formatTransactionType(type) {
  const types = {
    expense: "🔴 Despesa",
    income: "🟢 Receita",
  };
  return types[type] || type;
}

/**
 * Obter emoji de categoria
 */
export function getCategoryEmoji(category) {
  const emojis = {
    alimentação: "🍔",
    transporte: "🚗",
    saúde: "🏥",
    educação: "📚",
    lazer: "🎮",
    moradia: "🏠",
    vestuário: "👕",
    outros: "📦",
    salário: "💰",
    freelance: "💻",
    investimentos: "📈",
    presentes: "🎁",
  };
  return emojis[category.toLowerCase()] || "📌";
}

/**
 * Formatar lista de transações para mensagem
 */
export function formatTransactionsList(transactions) {
  if (!transactions || transactions.length === 0) {
    return "📭 Nenhuma transação encontrada.";
  }

  let message = "📋 *Transações*\n\n";

  transactions.forEach((t, index) => {
    const emoji = t.type === "income" ? "🟢" : "🔴";
    const categoryEmoji = getCategoryEmoji(t.category);
    message += `${index + 1}. ${emoji} ${formatCurrency(t.amount)}\n`;
    message += `   ${categoryEmoji} ${t.description}\n`;
    message += `   📅 ${formatRelativeDate(t.date)}\n`;
    if (t.category) {
      message += `   🏷️ ${t.category}\n`;
    }
    message += "\n";
  });

  return message;
}

/**
 * Formatar resumo de saldo
 */
export function formatBalanceSummary(income, expenses, balance) {
  let message = "💰 *Resumo Financeiro*\n\n";
  message += `🟢 Receitas: ${formatCurrency(income)}\n`;
  message += `🔴 Despesas: ${formatCurrency(expenses)}\n`;
  message += `━━━━━━━━━━━━━━━━\n`;

  const balanceEmoji = balance >= 0 ? "✅" : "⚠️";
  message += `${balanceEmoji} Saldo: ${formatCurrency(balance)}\n`;

  return message;
}
