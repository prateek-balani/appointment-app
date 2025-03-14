import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing.jsx";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import Appointments from "./components/appointments.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </Router>
  );
};

export default App;
