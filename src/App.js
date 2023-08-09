import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Home from "./pages/Home";
import UpdateProfile from "./pages/ProfileUpdate";
import PasswordResetForm from "./components/PasswordReset";
import AuthContext from "./auth-store/AuthContext";

function PrivateRoute({ element }) {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return element;
}

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/forgot-password" element={<PasswordResetForm />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="profile-update" element={<UpdateProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
