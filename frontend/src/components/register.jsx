import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Register = () => {
    const navigate = useNavigate();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [role, setRole] = useState("applicant"); // default role


    const registerUser = async (e) => {
        e.preventDefault();
        const data = { fname, lname, email, pass, role };
        try {
            const response = await fetch("http://localhost:5050/users/register", { // hardcoding it to backend register route 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const user = await response.json();
                console.log(user);
                alert("User registered successfully");
                navigate("/login");
            }
        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>  {/*form to register user */}
                <input placeholder="First Name" value={fname} onChange={(e) => setFname(e.target.value)} />
                <input placeholder="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} />
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
                <select placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="applicant">applicant</option>
                    <option value="staff">Staff</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
export default Register;