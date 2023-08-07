import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Home from "./pages/Home";

function App() {
  return (
      <Router> 
        <Routes>
          <Route path="/home" element={<Home />} /> 
          <Route path="/" element={<AuthForm />} />
        </Routes>
      </Router>
  );
}

export default App;
