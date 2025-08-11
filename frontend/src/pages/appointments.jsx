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

  const deleteAppointment = async (id) => {
    try {
      const response = await fetch(
        isProduction
          ? `/api/appointments/${id}`
          : `http://localhost:5050/api/appointments/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },

        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete appointment: ${response.statusText}`);
      }
      window.location.reload();

    } catch (e) {
      console.error(e.message);
      alert("Failed to delete appointment. Try again.");
    }


  }

  return (
    <section className="flex items-center justify-center h-screen bg-gray-700">
      <div className="w-full max-w-md p-8 space-y-5 bg-black rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Appointments</h1>
        <table className="w-full text-center text-gray-900 dark:text-white">
          <thead>
            <tr>
              <th className="text-base font-semibold text-center text-gray-900 dark:text-white">ID:</th>
              <th className="text-base font-semibold text-center text-gray-900 dark:text-white">Date/Time:</th>
              <th className="text-base font-semibold text-center text-gray-900 dark:text-white">Details:</th>

            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (


              <tr key={appt.id} className="border-t border-gray-300 dark:border-gray-700">
                <td className="px-4 py-2"> {appt.id}</td>
                <td className="px-4 py-2"> {appt.dateTime}</td>
                <td className="px-4 py-2">{appt.details}</td>
                <td className="px-4 py-2"><button
                  onClick={() => deleteAppointment(appt.id)}
                  className="btn btn-info"
                >
                  Cancel Appointment
                </button></td>
              </tr>



            ))}
          </tbody>
        </table>

      </div>
    </section>
  );
};



export default Appointments;