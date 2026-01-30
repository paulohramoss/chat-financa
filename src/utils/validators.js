/**
 * Validar valor monetário
 */
export function isValidAmount(amount) {
  return typeof amount === "number" && amount > 0 && !isNaN(amount);
}

/**
 * Validar tipo de transação
 */
export function isValidTransactionType(type) {
  return ["income", "expense"].includes(type);
}

/**
 * Validar data
 */
export function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

/**
 * Validar string não vazia
 */
export function isNonEmptyString(str) {
  return typeof str === "string" && str.trim().length > 0;
}
