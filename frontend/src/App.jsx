import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/landing.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Appointments from "./pages/appointments.jsx";
import Navbar from './components/navbar.jsx';
import BookAppointmets from './pages/bookAppointments.jsx';
import AccountInfo from './pages/accountInfo.jsx';
import AdminAccount from './pages/adminAccount.jsx';
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    setLoading(true);
    let roles = "";
    if (token) {
      try {
        const decoded = jwtDecode(token);
        roles = decoded.role;
        console.log("role:", roles);


        setRole(roles);


      } catch (e) {
        setRole(null);
        console.error("Invalid token", e);
      }
    } else {

      console.log("unable to get token")
    }
    setLoading(false);
  }, [token]);

  if (loading) {
    return <div>Loading application...</div>;
  }


  return (
    <Router>
      <>
        <Navbar token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={token ? <Navigate to="/appointments" replace /> : <Landing />} />
          <Route path="/login" element={token ? <Navigate to="/appointments" replace /> : <Login setToken={setToken} />} />
          <Route path="/register" element={token ? <Navigate to="/appointments" replace /> : <Register />} />
          <Route path="/appointments" element={token ? <Appointments /> : <Navigate to="/" replace />} />
          <Route path="/booking" element={token ? <BookAppointmets /> : <Navigate to="/" replace />} />
          <Route path="/account" element={token ? <AccountInfo /> : <Navigate to="/" replace />} />
          <Route path="/adminac" element={role === "admin" ? <AdminAccount /> : <Navigate to="/" replace />} />


        </Routes>
      </>
    </Router>
  );
};

export default App;
