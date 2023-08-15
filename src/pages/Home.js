import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../auth-store/AuthContext";
import ExpenseManager from "../components/ExpenseManager";
import "./Home.css";

import axios from "axios";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    authCtx.logout();
    navigate("/");
  };

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
          <ExpenseManager />
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
