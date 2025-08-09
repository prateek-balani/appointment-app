import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const isProduction = process.env.NODE_ENV === "production";


const Login = ({setToken}) => {
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
                setToken(user.token);

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
        <section className="flex flex-col items-center justify-center h-screen bg-gray-700 pt-10 pb-10">
            <div className="w-full max-w-md p-8 space-y-5 bg-black rounded-lg shadow-lg dark:bg-gray-800">
                <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Welcome to the Login Page</h1>

                <form onSubmit={loginUser}>
                    <div className="space-y-4 flex flex-col">
                        <div className="mx-10">
                            <label htmlFor="email" className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </g>
                                </svg>
                                <input placeholder="mail@site.com" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </label>
                            <div className="validator-hint hidden">Enter valid email address</div>
                        </div>
                        <div className="mx-10">
                            <label htmlFor="password" className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                        ></path>
                                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                    </g>
                                </svg>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                   
                                />
                            </label>
                            <p className="validator-hint hidden">
                                Enter a valid password</p>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login;