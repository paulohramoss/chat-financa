import {
  getBalance,
  getMonthTransactions,
} from "../services/transactionService.js";
import { formatBalanceSummary, formatCurrency } from "../utils/formatters.js";
import moment from "moment";

/**
 * Comando /saldo - mostra saldo atual
 */
export async function handleBalanceCommand(userId) {
  try {
    // Saldo do mês atual
    const monthBalance = await getBalance(userId, {
      startDate: moment().startOf("month").toDate(),
      endDate: moment().endOf("month").toDate(),
    });

    // Saldo total (todas as transações)
    const totalBalance = await getBalance(userId);

    let message = "💰 *SEU SALDO*\n\n";

    message += `*📅 ${moment().format("MMMM [de] YYYY")}*\n`;
    message += formatBalanceSummary(
      monthBalance.income,
      monthBalance.expenses,
      monthBalance.balance,
    );

    message += "\n━━━━━━━━━━━━━━━━\n";
    message += "*📊 SALDO TOTAL*\n\n";
    message += `${totalBalance.balance >= 0 ? "✅" : "⚠️"} ${formatCurrency(totalBalance.balance)}\n`;
    message += `📝 ${totalBalance.transactionsCount} transações registradas\n`;

    return message;
  } catch (error) {
    console.error("Erro ao processar comando de saldo:", error);
    return "❌ Erro ao buscar saldo. Tente novamente.";
  }
}
