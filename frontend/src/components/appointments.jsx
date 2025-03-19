import React from "react";
import { useEffect, useState } from "react";
const isProduction = process.env.NODE_ENV === "production";




const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const getAppointments = async () => {
            try {
                fetch(isProduction ? "/api/appointments":"http://localhost:5050/api/appointments")
                    .then((res) => res.json())
                    .then((data) => {
                        setAppointments(data);
                    }
                    );
            } catch (e) {
                console.error(e.message);
            }
        };
        getAppointments();
    }, []);
    
    if (appointments.length === 0) {
    return <p>No appointments found.</p>;
  }

  return (
    <div>
      <h1>Appointments</h1>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            <p>ID: {appt.id}</p>
            <p>Date/Time: {appt.dateTime}</p>
            <p>Details: {appt.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
    


export default Appointments;