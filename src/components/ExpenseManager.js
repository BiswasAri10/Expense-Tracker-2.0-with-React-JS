import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import ExpensesList from "./ExpensesList";

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showPremiumButton, setShowPremiumButton] = useState(false);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await fetch(
          "https://expense-tracker-data-e4ad9-default-rtdb.firebaseio.com/expenses.json"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }

        const data = await response.json();
        const expensesArray = Object.entries(data).map(([id, expense]) => ({
          id,
          ...expense,
        }));
        setExpenses(expensesArray);

        // Calculate total expenses
        const totalExpenses = expensesArray.reduce(
          (total, expense) => total + parseFloat(expense.moneySpent),
          0
        );

        // Set showPremiumButton based on total expenses
        setShowPremiumButton(totalExpenses > 10000);
      } catch (error) {
        console.error(error);
      }
    }

    fetchExpenses();
  }, []);

  const handleAddExpense = async (newExpense) => {
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

      const data = await response.json();
      const addedExpense = { id: data.name, ...newExpense };
      setExpenses([...expenses, addedExpense]);
      alert("Expense added successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateExpense = async (editingExpense, updatedExpense) => {
    try {
      const response = await axios.put(
        `https://expense-tracker-data-e4ad9-default-rtdb.firebaseio.com/expenses/${editingExpense.id}.json`,
        updatedExpense
      );

      if (response.status === 200) {
        const updatedExpenses = expenses.map((expense) =>
          expense.id === editingExpense.id ? { ...expense, ...updatedExpense } : expense
        );
        setExpenses(updatedExpenses);
        setEditingExpense(null);
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDeleteExpense = async (expense) => {
    try {
      const response = await axios.delete(
        `https://expense-tracker-data-e4ad9-default-rtdb.firebaseio.com/expenses/${expense.id}.json`
      );

      if (response.status === 200) {
        const updatedExpenses = expenses.filter((e) => e.id !== expense.id);
        setExpenses(updatedExpenses);
        console.log("Expense successfully deleted");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div>
      <ExpenseForm
        onAddExpense={handleAddExpense}
        onUpdateExpense={handleUpdateExpense}
        editingExpense={editingExpense}
      />
      {showPremiumButton && <button className="premium-button">Activate Premium</button>}
      <ExpensesList
        expenses={expenses}
        onDeleteExpense={handleDeleteExpense}
        onEditExpense={setEditingExpense}
      />
    </div>
  );
};

export default ExpenseManager;
