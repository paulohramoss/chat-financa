import { db } from "../config/firebase.js";
import moment from "moment";

/**
 * Criar nova transação
 */
export async function createTransaction(userId, transactionData) {
  try {
    const transactionsRef = db
      .collection("users")
      .doc(userId)
      .collection("transactions");

    const transaction = {
      ...transactionData,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await transactionsRef.add(transaction);

    return {
      id: docRef.id,
      ...transaction,
    };
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    throw error;
  }
}

/**
 * Obter transações com filtros opcionais
 */
export async function getTransactions(userId, options = {}) {
  try {
    const {
      startDate,
      endDate,
      type,
      category,
      limit = 100,
      orderBy = "date",
      orderDirection = "desc",
    } = options;

    let query = db.collection("users").doc(userId).collection("transactions");

    // Filtros
    if (startDate) {
      query = query.where("date", ">=", startDate);
    }
    if (endDate) {
      query = query.where("date", "<=", endDate);
    }
    if (type) {
      query = query.where("type", "==", type);
    }
    if (category) {
      query = query.where("category", "==", category);
    }

    // Ordenação e limite
    query = query.orderBy(orderBy, orderDirection).limit(limit);

    const snapshot = await query.get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      // Converter Timestamp para Date se necessário
      date: doc.data().date?.toDate
        ? doc.data().date.toDate()
        : doc.data().date,
      createdAt: doc.data().createdAt?.toDate
        ? doc.data().createdAt.toDate()
        : doc.data().createdAt,
    }));
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    throw error;
  }
}

/**
 * Obter transações de hoje
 */
export async function getTodayTransactions(userId) {
  const startOfDay = moment().startOf("day").toDate();
  const endOfDay = moment().endOf("day").toDate();

  return getTransactions(userId, {
    startDate: startOfDay,
    endDate: endOfDay,
  });
}

/**
 * Obter transações da semana
 */
export async function getWeekTransactions(userId) {
  const startOfWeek = moment().startOf("week").toDate();
  const endOfWeek = moment().endOf("week").toDate();

  return getTransactions(userId, {
    startDate: startOfWeek,
    endDate: endOfWeek,
  });
}

/**
 * Obter transações do mês
 */
export async function getMonthTransactions(userId) {
  const startOfMonth = moment().startOf("month").toDate();
  const endOfMonth = moment().endOf("month").toDate();

  return getTransactions(userId, {
    startDate: startOfMonth,
    endDate: endOfMonth,
  });
}

/**
 * Atualizar transação
 */
export async function updateTransaction(userId, transactionId, updates) {
  try {
    const transactionRef = db
      .collection("users")
      .doc(userId)
      .collection("transactions")
      .doc(transactionId);

    await transactionRef.update({
      ...updates,
      updatedAt: new Date(),
    });

    const doc = await transactionRef.get();
    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    console.error("Erro ao atualizar transação:", error);
    throw error;
  }
}

/**
 * Deletar transação
 */
export async function deleteTransaction(userId, transactionId) {
  try {
    await db
      .collection("users")
      .doc(userId)
      .collection("transactions")
      .doc(transactionId)
      .delete();

    return true;
  } catch (error) {
    console.error("Erro ao deletar transação:", error);
    throw error;
  }
}

/**
 * Calcular saldo
 */
export async function getBalance(userId, options = {}) {
  try {
    const transactions = await getTransactions(userId, options);

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expenses,
      balance: income - expenses,
      transactionsCount: transactions.length,
    };
  } catch (error) {
    console.error("Erro ao calcular saldo:", error);
    throw error;
  }
}

/**
 * Obter resumo por categoria
 */
export async function getCategorySummary(userId, options = {}) {
  try {
    const transactions = await getTransactions(userId, options);

    const summary = {};

    transactions.forEach((t) => {
      const category = t.category || "outros";
      if (!summary[category]) {
        summary[category] = {
          category,
          type: t.type,
          total: 0,
          count: 0,
          transactions: [],
        };
      }
      summary[category].total += t.amount;
      summary[category].count += 1;
      summary[category].transactions.push(t);
    });

    return Object.values(summary).sort((a, b) => b.total - a.total);
  } catch (error) {
    console.error("Erro ao gerar resumo por categoria:", error);
    throw error;
  }
}
