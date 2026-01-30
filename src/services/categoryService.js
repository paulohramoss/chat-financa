import { db } from "../config/firebase.js";

/**
 * Categorias padrão do sistema
 */
export const defaultCategories = {
  expenses: [
    { name: "alimentação", icon: "🍔", type: "expense" },
    { name: "transporte", icon: "🚗", type: "expense" },
    { name: "saúde", icon: "🏥", type: "expense" },
    { name: "educação", icon: "📚", type: "expense" },
    { name: "lazer", icon: "🎮", type: "expense" },
    { name: "moradia", icon: "🏠", type: "expense" },
    { name: "vestuário", icon: "👕", type: "expense" },
    { name: "outros", icon: "📦", type: "expense" },
  ],
  income: [
    { name: "salário", icon: "💰", type: "income" },
    { name: "freelance", icon: "💻", type: "income" },
    { name: "investimentos", icon: "📈", type: "income" },
    { name: "presentes", icon: "🎁", type: "income" },
    { name: "outros", icon: "📦", type: "income" },
  ],
};

/**
 * Obter todas as categorias de um usuário
 */
export async function getCategories(userId) {
  try {
    const categoriesRef = db
      .collection("users")
      .doc(userId)
      .collection("categories");
    const snapshot = await categoriesRef.get();

    if (snapshot.empty) {
      // Se não há categorias customizadas, retornar as padrão
      return [...defaultCategories.expenses, ...defaultCategories.income];
    }

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [...defaultCategories.expenses, ...defaultCategories.income];
  }
}

/**
 * Criar categoria customizada
 */
export async function createCategory(userId, categoryData) {
  try {
    const categoriesRef = db
      .collection("users")
      .doc(userId)
      .collection("categories");
    const docRef = await categoriesRef.add({
      ...categoryData,
      createdAt: new Date(),
    });

    return { id: docRef.id, ...categoryData };
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw error;
  }
}

/**
 * Verificar se categoria existe
 */
export async function categoryExists(userId, categoryName) {
  try {
    const categories = await getCategories(userId);
    return categories.some(
      (c) => c.name.toLowerCase() === categoryName.toLowerCase(),
    );
  } catch (error) {
    console.error("Erro ao verificar categoria:", error);
    return false;
  }
}

/**
 * Normalizar nome de categoria
 */
export function normalizeCategory(category) {
  return category.toLowerCase().trim();
}
