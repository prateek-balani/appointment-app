import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <section className="flex items-center justify-center h-screen bg-gray-700">
            <div className="w-full max-w-md p-8 space-y-5 bg-black rounded-lg shadow-lg dark:bg-gray-800">
                <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Appointment Making App</h1>
                <div className="flex space-x-6 justify-center"> 
                    <Link to="/login">
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Landing;