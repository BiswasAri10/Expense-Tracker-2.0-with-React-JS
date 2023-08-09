import React from "react";
import "./ExpensesList.css"; 

const ExpensesList = ({ expenses }) => {
  return (
    <div className="expenses-list-container">
      <h2 className="list-header">Expenses</h2>
      <div className="expenses-cards">
        {expenses.map((expense, index) => (
          <div key={index} className="expense-card">
            <div className="expense-info">
              <strong>Money Spent:</strong> ${expense.moneySpent}
            </div>
            <div className="expense-info">
              <strong>Description:</strong> {expense.expenseDescription}
            </div>
            <div className="expense-info">
              <strong>Category:</strong> {expense.expenseCategory}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesList;
