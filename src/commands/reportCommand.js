import {
  generateDailyReport,
  generateWeeklyReport,
  generateMonthlyReport,
  generateCategoryReport,
} from "../services/reportService.js";

/**
 * Comando /relatorio - gera relatórios
 */
export async function handleReportCommand(userId, args = []) {
  try {
    const reportType = args[0]?.toLowerCase();

    let report;

    switch (reportType) {
      case "semana":
      case "semanal":
        report = await generateWeeklyReport(userId);
        break;

      case "categoria":
      case "categorias":
        report = await generateCategoryReport(userId);
        break;

      case "hoje":
      case "diario":
      case "diário":
        report = await generateDailyReport(userId);
        break;

      case "mes":
      case "mês":
      case "mensal":
      default:
        report = await generateMonthlyReport(userId);
        break;
    }

    return report;
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    return {
      message: "❌ Erro ao gerar relatório. Tente novamente.",
      hasChart: false,
    };
  }
}

/**
 * Comando /hoje - relatório do dia
 */
export async function handleTodayCommand(userId) {
  return generateDailyReport(userId);
}

/**
 * Comando /semana - relatório da semana
 */
export async function handleWeekCommand(userId) {
  return generateWeeklyReport(userId);
}

/**
 * Comando /mes - relatório do mês
 */
export async function handleMonthCommand(userId) {
  return generateMonthlyReport(userId);
}
