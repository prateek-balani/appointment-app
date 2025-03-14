import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:5050/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email, password}),
            });
            
            if (response.ok) {
                const user = await response.json();
                
                
                localStorage.setItem("token", user.token);
            
                console.log(user);
                alert("User logged in successfully");
                navigate("/appointments");
            }
            else{
                alert("Invalid credentials");
            }
        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;