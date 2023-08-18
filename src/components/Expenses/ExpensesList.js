import React from "react";
import { useTheme } from "../../auth-store/ThemeContext";
import "./ExpensesList.css";

const ExpensesList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  const { darkTheme } = useTheme();
  return (
    <div className={darkTheme ? "dark-theme" : "light-theme"}>
      <div className="expenses-list-container">
        <h2 className="list-header">Expenses</h2>
        <div className="expenses-cards">
          {expenses.map((expense, index) => (
            <div key={index} className="expense-card">
              <div className="expense-info">
                <strong>Money Spent:</strong> Rs. {expense.moneySpent}
              </div>
              <div className="expense-info">
                <strong>Description:</strong> {expense.expenseDescription}
              </div>
              <div className="expense-info">
                <strong>Category:</strong> {expense.expenseCategory}
              </div>
              <button className={"edit-button"} onClick={() => onEditExpense(expense)}>Edit</button>
              <button className={"delete-button"} onClick={() => onDeleteExpense(expense)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpensesList;
