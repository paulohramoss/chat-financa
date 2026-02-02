import {
  parseTransaction,
  isTransactionMessage,
} from "../utils/messageParser.js";
import { createTransaction } from "../services/transactionService.js";
import {
  formatCurrency,
  getCategoryEmoji,
  formatTransactionType,
} from "../utils/formatters.js";
import { getHelpMessage, getWelcomeMessage } from "../commands/helpCommand.js";
import { handleBalanceCommand } from "../commands/balanceCommand.js";
import {
  handleReportCommand,
  handleTodayCommand,
  handleWeekCommand,
  handleMonthCommand,
} from "../commands/reportCommand.js";
import { handleListCommand } from "../commands/listCommand.js";
import { handleCategoriesCommand } from "../commands/categoriesCommand.js";

/**
 * Handler principal de mensagens
 */
export async function handleMessage(client, message) {
  try {
    const userId = message.from;
    const messageBody = message.body.trim();

    console.log(`[${userId}] Mensagem recebida: ${messageBody}`);

    // Verificar se é um comando
    if (messageBody.startsWith("/")) {
      await handleCommand(client, userId, messageBody);
      return;
    }

    // Tentar parsear como transação
    if (isTransactionMessage(messageBody)) {
      await handleTransactionMessage(client, userId, messageBody);
      return;
    }
  } catch (error) {
    console.error("Erro ao processar mensagem:", error);
    await client.sendMessage(
      message.from,
      "❌ Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.",
    );
  }
}

/**
 * Handler de comandos
 */
async function handleCommand(
  client,
  userId,
  messageBody,
) {
  const parts = messageBody.slice(1).split(" ");
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  let response;

  switch (command) {
    case "ajuda":
    case "help":
      response = getHelpMessage();
      break;

    case "start":
    case "inicio":
    case "começar":
      response = getWelcomeMessage();
      break;

    case "saldo":
    case "balance":
      response = await handleBalanceCommand(userId);
      break;

    case "hoje":
    case "today":
      const todayReport = await handleTodayCommand(userId);
      response = todayReport.message;
      break;

    case "semana":
    case "week":
      const weekReport = await handleWeekCommand(userId);
      response = weekReport.message;
      break;

    case "mes":
    case "mês":
    case "month":
      const monthReport = await handleMonthCommand(userId);
      response = monthReport.message;
      break;

    case "relatorio":
    case "relatório":
    case "report":
      const report = await handleReportCommand(userId, args);
      response = report.message;
      break;

    case "listar":
    case "list":
      response = await handleListCommand(userId, args);
      break;

    case "categorias":
    case "categories":
      response = await handleCategoriesCommand(userId);
      break;

    default:
      response = `❌ Comando não reconhecido: /${command}\n\nUse */ajuda* para ver os comandos disponíveis.`;
  }

  // Enviar resposta
  await client.sendMessage(userId, response);
}

/**
 * Handler de mensagens de transação
 */
async function handleTransactionMessage(
  client,
  userId,
  messageBody,
) {
  const transactionData = parseTransaction(messageBody);

  if (!transactionData) {
    await client.sendMessage(
      userId,
      '❌ Não consegui entender a transação. Por favor, tente novamente.\n\nExemplo: "mercado 50 reais"',
    );
    return;
  }

  try {
    // Criar transação no banco
    const transaction = await createTransaction(userId, transactionData);

    // Confirmar criação
    const typeEmoji = transaction.type === "income" ? "🟢" : "🔴";
    const categoryEmoji = getCategoryEmoji(transaction.category);

    let confirmMessage = `✅ *Transação registrada!*\n\n`;
    confirmMessage += `${typeEmoji} ${formatTransactionType(transaction.type)}\n`;
    confirmMessage += `💵 Valor: ${formatCurrency(transaction.amount)}\n`;
    confirmMessage += `📝 Descrição: ${transaction.description}\n`;
    confirmMessage += `${categoryEmoji} Categoria: ${transaction.category}\n\n`;
    confirmMessage += `Use */saldo* para ver seu saldo atualizado.`;

    await client.sendMessage(userId, confirmMessage);
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    await client.sendMessage(
      userId,
      "❌ Erro ao registrar transação. Tente novamente.",
    );
  }
}

/**
 * Handler de novos chats (primeira mensagem)
 */
export async function handleNewChat(client, chat) {
  void client;
  void chat;
}
