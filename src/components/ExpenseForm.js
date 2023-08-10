import React, { useState } from "react";
import "./ExpenseForm.css"; 

const ExpenseForm = ({ onAddExpense }) => {
  const [moneySpent, setMoneySpent] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newExpense = {
      moneySpent,
      expenseDescription,
      expenseCategory,
    };
  
    try {
      const response = await fetch(
        "https://expense-tracker-data-e4ad9-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(newExpense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to add expense");
      }
  
      setMoneySpent("");
      setExpenseDescription("");
      setExpenseCategory("");
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="expense-form-container">
      <h2 className="form-header">Add Expense</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">Money Spent: </label>
          <input
            type="number"
            value={moneySpent}
            onChange={(e) => setMoneySpent(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Expense Description: </label>
          <input
            type="text"
            value={expenseDescription}
            onChange={(e) => setExpenseDescription(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Expense Category: </label>
          <select
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
            className="select"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
