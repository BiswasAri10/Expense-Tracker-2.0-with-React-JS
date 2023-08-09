import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import AuthContext from "../auth-store/AuthContext";
import Home from "../pages/Home";

const AuthGuard = ({ path, element }) => {
  const authCtx = useContext(AuthContext);

  return authCtx.isLoggedIn ? (
    <Route path="/home" element={<Home />} /> 
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AuthGuard;
