import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Home from "./pages/Home";
import UpdateProfile from "./pages/ProfileUpdate";

function App() {
  return (
      <Router> 
        <Routes>
          <Route path="/home" element={<Home />} /> 
          <Route path="/" element={<AuthForm />} />
          <Route path="profile-update" element={<UpdateProfile />} />
        </Routes>
      </Router>
  );
}

export default App;
