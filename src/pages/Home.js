import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../auth-store/AuthContext";

import axios from "axios";

const Home = () => {
  const authCtx = useContext(AuthContext);

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

  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      {authCtx.isLoggedIn && authCtx.profileComplete ? (
        <p>Your profile is complete. You can start using the app now.</p>
      ) : (
        <p>
          Your profile is incomplete. To complete your profile{" "}
          <Link to="/profile-update">click here</Link>.
        </p>
      )}
    </div>
  );
};

export default Home;
