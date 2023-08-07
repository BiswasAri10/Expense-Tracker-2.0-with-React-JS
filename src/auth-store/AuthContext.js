import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  email: "",
  login: (token, email) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);

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

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    email: email,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
