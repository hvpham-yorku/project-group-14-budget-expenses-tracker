import { useEffect, useState } from "react";
import { getExpensesByTerm } from "../api/expenseAPI";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [term, setTerm] = useState("Winter 2026");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [filterType, setFilterType] = useState("term");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    getExpensesByTerm(term)
      .then(data => setExpenses(data))
      .catch(err => console.error(err));
  }, [term]);

  const categories = ["All", "Food", "Tuition", "Textbooks", "Subscriptions"];

  const filteredExpenses = expenses.filter(expense => {
    if (filterType === "category" && categoryFilter !== "All") {
      return expense.category === categoryFilter;
    }
    return true;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Student Budget Tracker</h1>
        <div className="tab-navigation">
          <button 
            className={activeTab === "dashboard" ? "active" : ""} 
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === "view" ? "active" : ""} 
            onClick={() => setActiveTab("view")}
          >
            View Expenses
          </button>
        </div>
      </header>

      <main className="content">
        {activeTab === "dashboard" ? (
          <>
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
              <p><strong>$0</strong> spent of <strong>$0</strong></p>
              <input type="number" placeholder="Set term budget" />
              <button style={{ marginTop: "8px" }}>Save Budget</button>
            </section>

            <section className="card">
              <ExpenseForm form={(newExpense) => console.log(newExpense)} />
            </section>
          </>
        ) : (
          <section className="card">
            <h2>View Expenses</h2>
            <div className="filter-controls">
              <label>Filter By:</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="term">Term ({term})</option>
                <option value="category">Category</option>
              </select>

              {filterType === "category" && (
                <select 
                  value={categoryFilter} 
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{ marginTop: "10px" }}
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              )}
            </div>

            <div className="expense-display" style={{ marginTop: "20px" }}>
              {filteredExpenses.length === 0 ? (
                <p className="empty">No expenses found for this selection</p>
              ) : (
                <ul className="expense-list">
                  {filteredExpenses.map(expense => (
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
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function ExpenseForm({ form }) {
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const submit = () => {
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
    <div>
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
        style={{ width: "100%", marginTop: "8px", padding: "8px", boxSizing: "border-box" }}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ width: "100%", marginTop: "8px", padding: "8px", boxSizing: "border-box" }}
      />
      <button onClick={submit} style={{ marginTop: "8px", width: "100%" }}>Add</button>
    </div>
  );
}

export default App;