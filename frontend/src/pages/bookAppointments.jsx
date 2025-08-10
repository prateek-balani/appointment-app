import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
const isProduction = process.env.NODE_ENV === "production";

const BookAppointmets = () => {
    const [staff, setStaff] = useState([]);
    const [hours, setHours] = useState([]);
    const [apptDate, setApptDate] = useState("");
    const [apptStaff, setApptStaff] = useState("");
    const [apptHours, setApptHours] = useState("");
    const [apptDetails, setapptDetails] = useState("");
    const navigate = useNavigate();

    const createAppointment = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        let userId = 0;
        if (token) {
            const decoded = jwtDecode(token);
            userId = decoded.id;
            console.log("userid", userId);

        }
        const dateandtime = `${apptDate} ${apptHours}`;
        console.log("date and time", dateandtime);
        console.log("staff id", apptStaff);
        try {
            const response = await fetch(isProduction ? "/api/appointments" : "http://localhost:5050/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ createdById: userId, assignedToId: apptStaff, dateTime: dateandtime,details: apptDetails }),

            });
            if (!response.ok) {
                console.log("booking failed");
                throw new Error(`Error: ${response.statusText}`);

            }
            else {
                alert("Appointment Booked successfully");
                navigate("/appointments");
            }



        }
        catch (err) {
            console.log(err.message);

        }


    }
    useEffect(() => {
        const getStaff = async () => {
            try {
                const response = await fetch(isProduction ? "/api/users/staff" : "http://localhost:5050/api/users/staff");
                if (!response.ok) {
                    console.log("error pulling staff data");
                    throw new Error(`Error: ${response.statusText}`);

                }
                const data = await response.json();
                console.log(data);
                setStaff(data);


            }
            catch (err) {
                console.error(err.message);

            }


        };
        getStaff();

    },
        []);
    useEffect(() => {
        const getHours = async (date) => {
            if (!date) {
                console.log("No date entered");
            }
            try {
                const response = await fetch(isProduction ? `/api/appointments/appt?date=${date}` : `http://localhost:5050/api/appointments/appt?date=${date}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data);
                setHours(data);


            }
            catch (err) {
                console.error(err.message);

            }


        };
        getHours();
    }, [])




    return (
        <section className="flex items-center justify-center h-screen bg-gray-700">
            <div className="w-full max-w-md p-8 space-y-5 bg-black rounded-lg shadow-lg dark:bg-gray-800">
                <form onSubmit={createAppointment}>
                    <label htmlFor="staff" className="select">
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

                        <select placeholder="Select Staff Member" className='select text-gray-400' value={apptStaff} onChange={(e) => setApptStaff(e.target.value)}>
                            <option value="" disabled>
                                -- Select Staff --
                            </option>
                            {staff.map((mem) => (
                                <option value={mem.id}>{mem.firstName} {mem.lastName}</option>
                            ))}

                        </select>
                    </label>
                    <label htmlFor="date" className="date">
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
                        <input type="date" className="input" value={apptDate} onChange={(e) => setApptDate(e.target.value)} />

                    </label>

                    <label htmlFor="hours" className="select">

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

                        <select className='select text-gray-400' value={apptHours} onChange={(e) => setApptHours(e.target.value)}>
                            <option value="" disabled>
                                -- Select Hours --
                            </option>
                            {hours.map((time) => (
                                <option value={time}>{time}</option>

                            ))}

                        </select>
                    </label>
                    <label htmlFor="details">

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

                        <input type="text" placeholder="Type here" className="input" value={apptDetails} onChange={(e) => setapptDetails(e.target.value)} />
                    </label>


                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Book</button>
                </form>
            </div>
        </section>
    );

}
export default BookAppointmets;