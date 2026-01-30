import { getCategoryEmoji } from "./formatters.js";

/**
 * Gerar "gráfico" de texto ASCII para categorias
 */
export async function generateCategoryPieChart(categorySummary) {
  try {
    let chart = "\n📊 *Gráfico de Gastos*\n\n";

    const total = categorySummary.reduce((sum, c) => sum + c.total, 0);
    const maxBarLength = 20;

    categorySummary.slice(0, 8).forEach((cat) => {
      const emoji = getCategoryEmoji(cat.category);
      const percentage = ((cat.total / total) * 100).toFixed(1);
      const barLength = Math.round((cat.total / total) * maxBarLength);
      const bar = "█".repeat(barLength) + "░".repeat(maxBarLength - barLength);

      chart += `${emoji} ${cat.category}\n`;
      chart += `${bar} ${percentage}%\n\n`;
    });

    return chart;
  } catch (error) {
    console.error("Erro ao gerar gráfico de pizza:", error);
    throw error;
  }
}

/**
 * Gerar "gráfico" de texto ASCII: receitas vs despesas
 */
export async function generateIncomeExpenseChart(income, expenses) {
  try {
    const maxValue = Math.max(income, expenses);
    const maxBarLength = 20;

    let chart = "\n📊 *Receitas vs Despesas*\n\n";

    const incomeBar = Math.round((income / maxValue) * maxBarLength);
    const expenseBar = Math.round((expenses / maxValue) * maxBarLength);

    chart += `🟢 Receitas\n`;
    chart += `${"█".repeat(incomeBar)}${"░".repeat(maxBarLength - incomeBar)}\n`;
    chart += `R$ ${income.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n\n`;

    chart += `🔴 Despesas\n`;
    chart += `${"█".repeat(expenseBar)}${"░".repeat(maxBarLength - expenseBar)}\n`;
    chart += `R$ ${expenses.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n`;

    return chart;
  } catch (error) {
    console.error("Erro ao gerar gráfico de barras:", error);
    throw error;
  }
}

/**
 * Gerar "gráfico" de linha de evolução temporal (simplificado)
 */
export async function generateTimelineChart(transactions) {
  try {
    // Agrupar transações por dia
    const dailyData = {};

    transactions.forEach((t) => {
      const date = new Date(t.date).toLocaleDateString("pt-BR");
      if (!dailyData[date]) {
        dailyData[date] = { income: 0, expense: 0 };
      }
      if (t.type === "income") {
        dailyData[date].income += t.amount;
      } else {
        dailyData[date].expense += t.amount;
      }
    });

    let chart = "\n📈 *Evolução Temporal*\n\n";

    const dates = Object.keys(dailyData).sort();
    dates.slice(-7).forEach((date) => {
      const data = dailyData[date];
      chart += `📅 ${date}\n`;
      chart += `  🟢 R$ ${data.income.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n`;
      chart += `  🔴 R$ ${data.expense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n\n`;
    });

    return chart;
  } catch (error) {
    console.error("Erro ao gerar gráfico de linha:", error);
    throw error;
  }
}
