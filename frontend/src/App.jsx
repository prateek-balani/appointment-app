import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/landing.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Appointments from "./pages/appointments.jsx";
import Navbar from './components/navbar.jsx';
import BookAppointmets from './pages/bookAppointments.jsx';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <>
      <Navbar token={token} setToken={setToken}/>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/appointments" replace /> : <Landing />} />
        <Route path="/login" element={token ? <Navigate to="/appointments" replace /> : <Login setToken={setToken}/>} />
        <Route path="/register" element={token ? <Navigate to="/appointments" replace /> : <Register />} />
        <Route path="/appointments" element={token ? <Appointments />:<Navigate to="/" replace />} />
        <Route path="/booking" element={token ? <BookAppointmets />:<Navigate to="/" replace />} />
      </Routes>
      </>
    </Router>
  );
};

export default App;
