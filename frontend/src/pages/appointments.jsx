import React from "react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const isProduction = process.env.NODE_ENV === "production";






const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      const token = localStorage.getItem("token");
      let userId = 0;
      if (token) {
        const decoded = jwtDecode(token);
        userId = decoded.id;
        console.log("userid", userId);

      }
      try {
       
        const response = await fetch(isProduction ? `/api/appointments/${userId}` : `http://localhost:5050/api/appointments/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`  // token here
          },
        }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        setAppointments(data);
      } catch (e) {
        console.error(e.message);
      }
    };
    getAppointments();
  }, []);

  if (appointments.length === 0) {
    return <section className="flex items-center justify-center h-screen bg-gray-700">
      <div className="w-full max-w-md p-8 space-y-5 bg-black rounded-lg shadow-lg dark:bg-gray-800">
        <p className="text-base font-semibold text-center text-gray-900 dark:text-white">No appointments found.</p>
      </div>
    </section>;
  }

  return (
    <section className="flex items-center justify-center h-screen bg-gray-700">
      <div className="w-full max-w-md p-8 space-y-5 bg-black rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Appointments</h1>
        <ul>
          {appointments.map((appt) => (
            <li key={appt.id}>
              <p className="text-base font-semibold text-center text-gray-900 dark:text-white">ID: {appt.id}</p>
              <p className="text-base font-semibold text-center text-gray-900 dark:text-white">Date/Time: {appt.dateTime}</p>
              <p className="text-base font-semibold text-center text-gray-900 dark:text-white">Details: {appt.details}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};



export default Appointments;