import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../auth-store/AuthContext";
import ExpenseForm from "../components/ExpenseForm";
import ExpensesList from "../components/ExpensesList";
import "./Home.css";

import axios from "axios";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  const handleLogout = () => {
    authCtx.logout();
    navigate("/");
  };

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      const fetchExpenses = async () => {
        try {
          const response = await fetch(
            "https://expense-tracker-data-e4ad9-default-rtdb.firebaseio.com/expenses.json"
          );

          if (!response.ok) {
            throw new Error("Failed to fetch expenses");
          }

          const data = await response.json();
          const expensesArray = Object.values(data);
          setExpenses(expensesArray);
        } catch (error) {
          console.error(error);
        }
      };

      fetchExpenses();
    }
  }, [authCtx]);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      async function fetchUserProfile() {
        try {
          const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCR645Usau9CFI7QsbvX-fL7iehx-P4xU8`,
            JSON.stringify({
              idToken: authCtx.token,
            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data && response.data.users.length > 0) {
            const user = response.data.users[0];
            const isProfileComplete = !!user.displayName && !!user.photoUrl;

            authCtx.setProfileComplete(isProfileComplete);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }

      fetchUserProfile();
    }
  }, [authCtx]);

  const handleVerifyEmail = async () => {
    if (authCtx.isLoggedIn) {
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCR645Usau9CFI7QsbvX-fL7iehx-P4xU8`,
          JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.token,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(
          "Email verification link sent successfully:",
          response.data
        );
        alert(
          "Email verification link sent successfully, Please Open your Mail inbox and verify your Email"
        );
      } catch (error) {
        console.error("Error sending email verification:", error);
      }
    }
  };

  return (
    <div className="home-container">
      <h1 className="header">Welcome to Expense Tracker</h1>
      {authCtx.isLoggedIn && authCtx.profileComplete ? (
        <div>
          <p>Your profile is complete. You can start using the app now.</p>
          <button onClick={handleVerifyEmail}>Verify Email</button>
          <ExpenseForm onAddExpense={handleAddExpense} />
          {expenses.length > 0 && <ExpensesList expenses={expenses} />}
        </div>
      ) : (
        <p className="incomplete-profile">
          Your profile is incomplete. To complete your profile{" "}
          <Link to="/profile-update">click here</Link>.
        </p>
      )}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
