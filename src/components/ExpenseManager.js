import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import ExpensesList from "./ExpensesList";

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showPremiumButton, setShowPremiumButton] = useState(false);
  const [premiumActivated, setPremiumActivated] = useState(false);

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

        const totalExpenses = expensesArray.reduce(
          (total, expense) => total + parseFloat(expense.moneySpent),
          0
        );

        setShowPremiumButton(totalExpenses > 10000);
      } catch (error) {
        console.error(error);
      }
    }

    fetchExpenses();
  }, [expenses]);

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
          expense.id === editingExpense.id
            ? { ...expense, ...updatedExpense }
            : expense
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

  const handleActivatePremium = () => {
    setPremiumActivated(true);
  };

  const handleDeactivatePremium = () => {
    setPremiumActivated(false);
  };

  const handleDownloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      expenses
        .map(
          (expense) =>
            `${expense.moneySpent},${expense.expenseDescription},${expense.expenseCategory}`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <ExpenseForm
        onAddExpense={handleAddExpense}
        onUpdateExpense={handleUpdateExpense}
        editingExpense={editingExpense}
      />
      {showPremiumButton && !premiumActivated && (
        <button onClick={handleActivatePremium} className="premium-button">
          Activate Premium
        </button>
      )}
      {premiumActivated ? (
        <>
          <button onClick={handleDeactivatePremium} className="premium-button">
            Deactivate Premium
          </button>
          <button onClick={handleDownloadCSV}>Download File</button>
        </>
      ) : null}
      <ExpensesList
        expenses={expenses}
        onDeleteExpense={handleDeleteExpense}
        onEditExpense={setEditingExpense}
      />
    </div>
  );
};

export default ExpenseManager;
