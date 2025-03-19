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
              
                    <div className="space-y-4">

                        <div>
                            <label for="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input placeholder="First Name" id="fname" value={fname} onChange={(e) => setFname(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label for="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input placeholder="Last Name" id="lname" value={lname} onChange={(e) => setLname(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label for="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                            <select placeholder="Role" id="role" value={role} onChange={(e) => setRole(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="admin">Admin</option>
                                <option value="applicant">Applicant</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                    </div>
                </form>
            </div>
        </section>
    )
}
export default Register;