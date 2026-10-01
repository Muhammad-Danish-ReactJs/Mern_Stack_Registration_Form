import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx";
import Dashboard from "./Components/Dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
