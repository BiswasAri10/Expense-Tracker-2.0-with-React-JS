import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./auth-store/AuthContext";
import { ThemeProvider } from "./auth-store/ThemeContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ThemeProvider>
);
