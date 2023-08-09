import React from "react";

const ExpensesList = ({ expenses }) => {
  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <strong>Money Spent:</strong> ${expense.moneySpent},{" "}
            <strong>Description:</strong> {expense.expenseDescription},{" "}
            <strong>Category:</strong> {expense.expenseCategory}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensesList;
