import {
  getCategories,
  defaultCategories,
} from "../services/categoryService.js";
import { getCategoryEmoji } from "../utils/formatters.js";

/**
 * Comando /categorias - lista categorias disponíveis
 */
export async function handleCategoriesCommand(userId) {
  try {
    const categories = await getCategories(userId);

    let message = "🏷️ *CATEGORIAS DISPONÍVEIS*\n\n";

    // Separar por tipo
    const expenseCategories = categories.filter((c) => c.type === "expense");
    const incomeCategories = categories.filter((c) => c.type === "income");

    if (expenseCategories.length > 0) {
      message += "*🔴 Despesas:*\n";
      expenseCategories.forEach((cat) => {
        const emoji = getCategoryEmoji(cat.name);
        message += `${emoji} ${cat.name}\n`;
      });
      message += "\n";
    }

    if (incomeCategories.length > 0) {
      message += "*🟢 Receitas:*\n";
      incomeCategories.forEach((cat) => {
        const emoji = getCategoryEmoji(cat.name);
        message += `${emoji} ${cat.name}\n`;
      });
      message += "\n";
    }

    message += "━━━━━━━━━━━━━━━━\n";
    message +=
      "💡 O bot detecta automaticamente a categoria com base na descrição!\n";

    return message;
  } catch (error) {
    console.error("Erro ao listar categorias:", error);
    return "❌ Erro ao buscar categorias. Tente novamente.";
  }
}
