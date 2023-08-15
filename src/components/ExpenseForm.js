import React, { useState, useEffect } from "react";
import "./ExpenseForm.css"; 

const ExpenseForm = ({ onAddExpense, onUpdateExpense, editingExpense }) => {
  const [moneySpent, setMoneySpent] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setMoneySpent(editingExpense.moneySpent);
      setExpenseDescription(editingExpense.expenseDescription);
      setExpenseCategory(editingExpense.expenseCategory);
    }
  }, [editingExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedExpense = {
      moneySpent,
      expenseDescription,
      expenseCategory,
    };

    if (editingExpense) {
      onUpdateExpense(editingExpense, updatedExpense);
    } else {
      onAddExpense(updatedExpense);
    }

    setMoneySpent("");
    setExpenseDescription("");
    setExpenseCategory("");
  }
  

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
            <option value="Mobile">Mobile</option>
            <option value="Internet">Internet</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
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
