import { useEffect, useState } from "react";
import { getAllExpenses } from "../api/expenseAPI";
import { getExpensesByTerm } from "../api/expenseAPI";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [term, setTerm] = useState("Winter 2026")

useEffect(() => {
  getExpensesByTerm(term)
    .then(data => setExpenses(data))
    .catch(err => console.error(err)); /* error handling in case expenses is not set */
}, [term]);


  return (
  <div className="app">
    <header className="app-header">
      <h1>Student Budget Tracker</h1>
      <p>Track your spending by academic term</p>
    </header>

    <main className="content">
      <section className="card">
        <h2>Current Term</h2>
        <select>
          <option>Fall 2025</option>
          <option>Winter 2026</option>
          <option>Summer 2026</option>
        </select>
      </section>
      <section className="card">
          <h2>Term Budget</h2>
          <p><strong>$0</strong> spent of <strong>$0</strong></p>
          <input
            type="number" 
            placeholder="Set term budget"
          />
          <button style={{ marginTop: "8px" }}>Save Budget</button>
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

function Summary({ expenses }) {
  const BUDGET = 4500;
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const PERCENT = (total / BUDGET) * 100;

  let color = "green";
  if (PERCENT > 90) color = "red";
  else if (PERCENT > 75) color = "yellow";

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Term Budget Overview</h3>
      <p>Total Spent: <strong>${total.toFixed(2)}</strong></p>
      <p>Budget: ${BUDGET}</p>

      <p style={{ color }}>
        {PERCENT.toFixed(0)}% of budget used
      </p>
    </div>
  );
}

function ExpenseList({ expenses }) {
  if (expenses.length == 0) {
    return <p>No expenses yet - Add your first expense!</p>;
  }
  return (
    <div>
      <h3>Expenses</h3>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            <strong>{expense.category}</strong> — ${expense.amount}
            <br />
            <small>{expense.description}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExpenseForm({ form }) {
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const submit = () => { /* Used claudeAI to set date and filter categories above in function ExpenseForm */
    form({
      category,
      amount: Number(amount),
      description,
      academicTerm: "Winter 2026",
      date: new Date().toISOString().split("T")[0]
    });

    setAmount("");
    setDescription("");
  };
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Add Expense</h3>

      <select onChange={e => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Tuition</option>
        <option>Textbooks</option>
        <option>Subscriptions</option>
      </select>

      <input
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button onClick={submit}>Add</button>
    </div>
  );
}
const BASE_URL = "http://localhost:8080/api/expenses";
export async function createExpense( expense ) { 
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"}, /* used AI to stringify, I used fetch to filter term in useEffect which is fetched here. */
    body: JSON.stringify(expense)
  });
  return response.json();
}

export default App;
