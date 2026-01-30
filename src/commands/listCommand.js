import { getTransactions } from "../services/transactionService.js";
import { formatTransactionsList } from "../utils/formatters.js";

/**
 * Comando /listar - lista últimas transações
 */
export async function handleListCommand(userId, args = []) {
  try {
    // Obter limite de transações (padrão: 10)
    const limit = parseInt(args[0]) || 10;

    if (limit < 1 || limit > 100) {
      return "⚠️ Por favor, especifique um número entre 1 e 100.";
    }

    const transactions = await getTransactions(userId, {
      limit,
      orderBy: "date",
      orderDirection: "desc",
    });

    if (transactions.length === 0) {
      return '📭 Você ainda não possui transações registradas.\n\nEnvie uma mensagem como "mercado 50 reais" para começar!';
    }

    let message = `📋 *ÚLTIMAS ${transactions.length} TRANSAÇÕES*\n\n`;
    message += formatTransactionsList(transactions);

    return message;
  } catch (error) {
    console.error("Erro ao listar transações:", error);
    return "❌ Erro ao buscar transações. Tente novamente.";
  }
}
