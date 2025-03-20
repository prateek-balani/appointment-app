import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const isProduction = process.env.NODE_ENV === "production";


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(isProduction ? "/api/users/login" : "http://localhost:5050/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const user = await response.json();


                localStorage.setItem("token", user.token);

                console.log(user);
                alert("User logged in successfully");
                navigate("/appointments");
            }
            else {
                alert("Invalid credentials");
            }
        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <section className="flex flex-col items-center justify-center h-screen bg-gray-700">
            <div className="w-full max-w-md p-8 space-y-5 bg-black rounded-lg shadow-lg dark:bg-gray-800">
                <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Welcome to the Login Page</h1>

                <form onSubmit={loginUser}>
                    <div className="space-y-4">
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input placeholder="Email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login;