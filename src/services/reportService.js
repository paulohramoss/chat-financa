import {
  getBalance,
  getCategorySummary,
  getTodayTransactions,
  getWeekTransactions,
  getMonthTransactions,
  getTransactions,
} from "./transactionService.js";
import {
  formatCurrency,
  formatBalanceSummary,
  getCategoryEmoji,
} from "../utils/formatters.js";
import {
  generateCategoryPieChart,
  generateIncomeExpenseChart,
  generateTimelineChart,
} from "../utils/chartGenerator.js";
import moment from "moment";

/**
 * Gerar relatório diário
 */
export async function generateDailyReport(userId) {
  try {
    const transactions = await getTodayTransactions(userId);
    const balance = await getBalance(userId, {
      startDate: moment().startOf("day").toDate(),
      endDate: moment().endOf("day").toDate(),
    });

    let message = "📊 *RELATÓRIO DIÁRIO*\n";
    message += `📅 ${moment().format("DD/MM/YYYY")}\n\n`;
    message += formatBalanceSummary(
      balance.income,
      balance.expenses,
      balance.balance,
    );
    message += `\n📝 Total de transações: ${balance.transactionsCount}\n`;

    if (transactions.length > 0) {
      message += "\n━━━━━━━━━━━━━━━━\n";
      message += "*Últimas Transações:*\n\n";

      transactions.slice(0, 5).forEach((t, i) => {
        const emoji = t.type === "income" ? "🟢" : "🔴";
        message += `${i + 1}. ${emoji} ${t.description}\n`;
        message += `   ${formatCurrency(t.amount)} - ${getCategoryEmoji(t.category)} ${t.category}\n`;
      });
    }

    return { message, hasChart: false };
  } catch (error) {
    console.error("Erro ao gerar relatório diário:", error);
    throw error;
  }
}

/**
 * Gerar relatório semanal
 */
export async function generateWeeklyReport(userId) {
  try {
    const transactions = await getWeekTransactions(userId);
    const balance = await getBalance(userId, {
      startDate: moment().startOf("week").toDate(),
      endDate: moment().endOf("week").toDate(),
    });

    const categorySummary = await getCategorySummary(userId, {
      startDate: moment().startOf("week").toDate(),
      endDate: moment().endOf("week").toDate(),
    });

    let message = "📊 *RELATÓRIO SEMANAL*\n";
    message += `📅 ${moment().startOf("week").format("DD/MM")} a ${moment().endOf("week").format("DD/MM/YYYY")}\n\n`;
    message += formatBalanceSummary(
      balance.income,
      balance.expenses,
      balance.balance,
    );
    message += `\n📝 Total de transações: ${balance.transactionsCount}\n`;

    if (categorySummary.length > 0) {
      message += "\n━━━━━━━━━━━━━━━━\n";
      message += "*Por Categoria:*\n\n";

      categorySummary.slice(0, 5).forEach((cat, i) => {
        const emoji = getCategoryEmoji(cat.category);
        message += `${i + 1}. ${emoji} ${cat.category}\n`;
        message += `   ${formatCurrency(cat.total)} (${cat.count} transações)\n`;
      });
    }

    // Gerar gráfico de texto
    if (balance.income > 0 || balance.expenses > 0) {
      const chart = await generateIncomeExpenseChart(
        balance.income,
        balance.expenses,
      );
      message += "\n" + chart;
    }

    return { message, hasChart: false };
  } catch (error) {
    console.error("Erro ao gerar relatório semanal:", error);
    throw error;
  }
}

/**
 * Gerar relatório mensal
 */
export async function generateMonthlyReport(userId) {
  try {
    const transactions = await getMonthTransactions(userId);
    const balance = await getBalance(userId, {
      startDate: moment().startOf("month").toDate(),
      endDate: moment().endOf("month").toDate(),
    });

    const categorySummary = await getCategorySummary(userId, {
      startDate: moment().startOf("month").toDate(),
      endDate: moment().endOf("month").toDate(),
      type: "expense",
    });

    let message = "📊 *RELATÓRIO MENSAL*\n";
    message += `📅 ${moment().format("MMMM [de] YYYY")}\n\n`;
    message += formatBalanceSummary(
      balance.income,
      balance.expenses,
      balance.balance,
    );
    message += `\n📝 Total de transações: ${balance.transactionsCount}\n`;

    // Média diária
    const daysInMonth = moment().daysInMonth();
    const avgDaily = balance.expenses / daysInMonth;
    message += `📉 Média diária: ${formatCurrency(avgDaily)}\n`;

    if (categorySummary.length > 0) {
      message += "\n━━━━━━━━━━━━━━━━\n";
      message += "*Top 5 Categorias (Despesas):*\n\n";

      categorySummary.slice(0, 5).forEach((cat, i) => {
        const emoji = getCategoryEmoji(cat.category);
        const percentage = ((cat.total / balance.expenses) * 100).toFixed(1);
        message += `${i + 1}. ${emoji} ${cat.category}\n`;
        message += `   ${formatCurrency(cat.total)} (${percentage}%)\n`;
      });
    }

    // Gerar gráfico de texto por categoria
    if (categorySummary.length > 0) {
      const chart = await generateCategoryPieChart(categorySummary);
      message += "\n" + chart;
    }

    return { message, hasChart: false };
  } catch (error) {
    console.error("Erro ao gerar relatório mensal:", error);
    throw error;
  }
}

/**
 * Gerar relatório por categoria
 */
export async function generateCategoryReport(userId) {
  try {
    const categorySummary = await getCategorySummary(userId, {
      startDate: moment().startOf("month").toDate(),
      endDate: moment().endOf("month").toDate(),
    });

    let message = "📊 *RELATÓRIO POR CATEGORIA*\n";
    message += `📅 ${moment().format("MMMM [de] YYYY")}\n\n`;

    if (categorySummary.length === 0) {
      message += "📭 Nenhuma transação encontrada neste período.";
      return { message, hasChart: false };
    }

    categorySummary.forEach((cat, i) => {
      const emoji = getCategoryEmoji(cat.category);
      const typeEmoji = cat.type === "income" ? "🟢" : "🔴";
      message += `${i + 1}. ${emoji} ${cat.category} ${typeEmoji}\n`;
      message += `   ${formatCurrency(cat.total)}\n`;
      message += `   ${cat.count} transação(ões)\n\n`;
    });

    // Gerar gráfico de pizza de texto
    const expenseCategories = categorySummary.filter(
      (c) => c.type === "expense",
    );
    if (expenseCategories.length > 0) {
      const chart = await generateCategoryPieChart(expenseCategories);
      message += "\n" + chart;
    }

    return { message, hasChart: false };
  } catch (error) {
    console.error("Erro ao gerar relatório por categoria:", error);
    throw error;
  }
}

/**
 * Gerar relatório personalizado
 */
export async function generateCustomReport(userId, startDate, endDate) {
  try {
    const balance = await getBalance(userId, { startDate, endDate });
    const transactions = await getTransactions(userId, { startDate, endDate });

    let message = "📊 *RELATÓRIO PERSONALIZADO*\n";
    message += `📅 ${moment(startDate).format("DD/MM/YYYY")} a ${moment(endDate).format("DD/MM/YYYY")}\n\n`;
    message += formatBalanceSummary(
      balance.income,
      balance.expenses,
      balance.balance,
    );
    message += `\n📝 Total de transações: ${balance.transactionsCount}\n`;

    // Gerar gráfico de texto de evolução temporal
    if (transactions.length > 0) {
      const chart = await generateTimelineChart(transactions);
      message += "\n" + chart;
    }

    return { message, hasChart: false };
  } catch (error) {
    console.error("Erro ao gerar relatório personalizado:", error);
    throw error;
  }
}
