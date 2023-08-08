import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  email: "",
  profileComplete: false, // New state for profile completion
  login: (token, email) => {},
  logout: () => {},
  setProfileComplete: (isComplete) => {}, // Setter function for profile completion
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");
  const initialProfileComplete =
    localStorage.getItem("profileComplete") === "true"; // Load initial profile completion status

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const [profileComplete, setProfileComplete] = useState(
    initialProfileComplete
  ); // New state for profile completion

  const [logoutTimeout, setLogoutTimeout] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    localStorage.setItem("token", token);

    setEmail(email);
    localStorage.setItem("email", email);

    setLogoutTimeout(setTimeout(logoutHandler, 5 * 60 * 1000));
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    setEmail("");
    localStorage.removeItem("email");
    localStorage.removeItem("profileComplete"); // Remove profile completion status
    const currentUserEmail = localStorage.getItem("email");
    localStorage.removeItem(`cartItems_${currentUserEmail}`);

    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }
  };

  useEffect(() => {
    if (userIsLoggedIn) {
      setLogoutTimeout(setTimeout(logoutHandler, 5 * 60 * 1000));
    }

    return () => {
      if (logoutTimeout) {
        clearTimeout(logoutTimeout);
      }
    };
  }, [userIsLoggedIn]);

  useEffect(() => {
    localStorage.setItem("profileComplete", profileComplete); // Update profile completion status in local storage
  }, [profileComplete]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    email: email,
    profileComplete: profileComplete,
    login: loginHandler,
    logout: logoutHandler,
    setProfileComplete: setProfileComplete, // Provide the setter function
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
