import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const isProduction = process.env.NODE_ENV === "production";



const Register = () => {
    const navigate = useNavigate();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [role, setRole] = useState("applicant"); // default role


    const registerUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(isProduction ? "/api/users/register" : "http://localhost:5050/api/users/register", { // hardcoding it to backend register route 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fname, lname, email, pass, role }),
            });


            if (response.ok) {
                const user = await response.json();
                console.log(user);


                alert("User registered successfully");
                console.log("Navigating to login...");
                navigate("/login");
            } else {
                const errorMsg = await response.text();
                console.error("Registration failed:", errorMsg);
                alert("Registration failed, try a diff email");
            }
        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <section className="flex flex-col items-center justify-center h-screen bg-gray-700">
            <div className="w-full max-w-md p-8 space-y-5 bg-black rounded-lg shadow-lg dark:bg-gray-800">
                <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Welcome to the Registration Page</h1>

                <form onSubmit={registerUser}>  {/*form to register user */}

                    <div className="space-y-4 flex flex-col ">

                        <div>
                            <label htmlFor="fname" className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </g>
                                </svg>
                                <input placeholder="First Name" id="fname" type="text" value={fname} onChange={(e) => setFname(e.target.value)} required />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="lname" className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </g>
                                </svg>


                                <input placeholder="Last Name" id="lname" type="text" value={lname} onChange={(e) => setLname(e.target.value)} required />
                            </label>
                        </div>
                        <div>
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
                                <input placeholder="Email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </label>
                        </div>
                        <div>
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
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    minLength="8"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                />
                                <p className="validator-hint hidden">
                                    Must be more than 8 characters, including
                                    <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                                </p>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="role" className="select">
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
                                <select placeholder="Role" id="role" value={role} onChange={(e) => setRole(e.target.value)} className='select text-gray-400'>
                                    <option value="admin">Admin</option>
                                    <option value="applicant">Applicant</option>
                                    <option value="staff">Staff</option>
                                </select>
                            </label>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                    </div>
                </form>
            </div>
        </section>
    )
}
export default Register;