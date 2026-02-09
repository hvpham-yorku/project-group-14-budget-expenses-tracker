const BASE_URL = "http://localhost:8080/api/expenses";

export async function getAllExpenses() {
  const response = await fetch(BASE_URL);
  return response.json();
}

export async function getExpensesByTerm() {
  const response = await fetch(BASE_URL);
  return response.json();
}
