import React, { useContext } from "react";
import { useTheme } from "./auth-store/ThemeContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Home from "./pages/Home";
import UpdateProfile from "./pages/ProfileUpdate";
import PasswordResetForm from "./components/Auth/PasswordReset";
import AuthContext from "./auth-store/AuthContext";
import "./App.css";

function PrivateRoute({ element }) {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return element;
}

function App() {
  const { darkTheme } = useTheme();
  return (
    <div className={darkTheme ? "dark-theme" : "light-theme"}>
    <Router> 
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/forgot-password" element={<PasswordResetForm />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="profile-update" element={<UpdateProfile />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
