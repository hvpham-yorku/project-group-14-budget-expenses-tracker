const BASE_URL = "http://localhost:8080/api/expenses";

export async function getAllExpenses() {
  const response = await fetch(BASE_URL);
  return response.json();
}

export async function getExpensesByTerm(term) {
  const response = await fetch(`${BASE_URL}/term/${term}`);
  return response.json();
}

export async function getChronologicalExpensesByTerm(term) {
  const response = await fetch(`${BASE_URL}/term/${term}/chronological`);
  return response.json();
}

export async function getGroupedExpensesByTerm(term) {
  const response = await fetch(`${BASE_URL}/term/${term}/grouped`);
  return response.json();
}