import { useEffect, useState } from "react";
import { getExpensesByTerm } from "../api/expenseAPI";

const EXPENSE_URL = "http://localhost:8080/api/expenses";
const BUDGET_URL = "http://localhost:8080/api/budgets";

export async function createExpense(expense) {
  const response = await fetch(EXPENSE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense)
  });
  return response.json();
}

function App() {
  const [expenses, setExpenses] = useState([]);
  const [term, setTerm] = useState("Winter 2026");
  const [budget, setBudget] = useState(0);
  const [inputBudget, setInputBudget] = useState("");

  useEffect(() => {
    // Fetch expenses for the term
    getExpensesByTerm(term)
      .then(data => setExpenses(data))
      .catch(err => console.error(err));

    // Fetch budget for the term
    fetch(`${BUDGET_URL}/term/${term}`)
      .then(res => res.json())
      .then(data => {
        setBudget(data.amount);
        setInputBudget(data.amount);
      })
      .catch(err => console.error(err));
  }, [term]);

  const handleSaveBudget = async () => {
    try {
      const response = await fetch(BUDGET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ academicTerm: term, amount: Number(inputBudget) })
      });
      const data = await response.json();
      setBudget(data.amount);
      alert("Budget saved successfully!");
    } catch (err) {
      console.error("Error saving budget:", err);
    }
  };

  const handleAddExpense = async (newExpense) => {
    await createExpense(newExpense);
    const updatedExpenses = await getExpensesByTerm(term);
    setExpenses(updatedExpenses);
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Student Budget Tracker</h1>
        <p>Track your spending by academic term</p>
      </header>

      <main className="content">
        <section className="card">
          <h2>Current Term</h2>
          <select value={term} onChange={(e) => setTerm(e.target.value)}>
            <option>Fall 2025</option>
            <option>Winter 2026</option>
            <option>Summer 2026</option>
          </select>
        </section>

        <section className="card">
          <h2>Term Budget</h2>
          <p><strong>${totalSpent.toFixed(2)}</strong> spent of <strong>${budget}</strong></p>
          <input
            type="number"
            placeholder="Set term budget"
            value={inputBudget}
            onChange={(e) => setInputBudget(e.target.value)}
          />
          <button style={{ marginTop: "8px" }} onClick={handleSaveBudget}>Save Budget</button>
        </section>

        <section className="card">
          <ExpenseForm onAdd={handleAddExpense} currentTerm={term} />
        </section>

        <section className="card">
          <h2>Expenses</h2>
          {expenses.length === 0 ? (
            <p className="empty">No expenses yet</p>
          ) : (
            <ul className="expense-list">
              {expenses.map(expense => (
                <li key={expense.id} className="expense-item">
                  <div>
                    <strong>{expense.category}</strong>
                    <small>{expense.description}</small>
                  </div>
                  <span>${expense.amount}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

function ExpenseForm({ onAdd, currentTerm }) {
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const submit = () => {
    onAdd({
      category,
      amount: Number(amount),
      description,
      academicTerm: currentTerm,
      date: new Date().toISOString().split("T")[0]
    });
    setAmount("");
    setDescription("");
  };

  return (
    <div>
      <h3>Add Expense</h3>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Tuition</option>
        <option>Textbooks</option>
        <option>Subscriptions</option>
      </select>
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button onClick={submit}>Add</button>
    </div>
  );
}

export default App;