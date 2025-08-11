import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const isProduction = process.env.NODE_ENV === "production";

const AdminAccount = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [role, setRole] = useState("applicant"); // default role
    const navigate = useNavigate();
    const token = localStorage.getItem("token");


    const editRole = async (e, id) => {
        e.preventDefault();

        try {
            const response = await fetch(isProduction ? `/api/users/role/${id}` : `http://localhost:5050/api/users/role/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: role }),

            });
            if (!response.ok) {
                console.log("failed to add user info");
                throw new Error(`Error: ${response.statusText}`);

            }
            else {
                alert("data updated succesfully");
                navigate("/appointments");
            }



        }
        catch (err) {
            console.log(err.message);

        }


    }


    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await fetch(isProduction ? "/api/users" : "http://localhost:5050/api/users");
                if (!response.ok) {
                    console.log("erorr fetching user info")
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data);
                setUserInfo(data);

            }
            catch (err) {
                console.log(err.message)

            }
        }
        getUserInfo();

    }, []);

    return (
        <section className="flex items-center justify-center h-screen bg-gray-700">
            <div className="w-full max-w-md p-8 space-y-5 bg-black rounded-lg shadow-lg dark:bg-gray-800">
                <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Account info</h1>
                <div className="info-part">
                    <ul>
                        {userInfo.map((user) => (
                            <li key={user.id}>
                                <p className="text-base font-semibold text-center text-gray-900 dark:text-white">ID: {user.id}</p>
                                <p className="text-base font-semibold text-center text-gray-900 dark:text-white">First Name: {user.firstName}</p>
                                <p className="text-base font-semibold text-center text-gray-900 dark:text-white">Last Name: {user.lastName}</p>
                                <p className="text-base font-semibold text-center text-gray-900 dark:text-white">Email: {user.email}</p>
                                <form onSubmit={(e) => editRole(e, user.id)}>


                                    <label htmlFor={`role-${user.id}`} className="text-base font-semibold text-center text-gray-900 dark:text-white " >Role:</label>

                                    <select id={`role-${user.id}`} value={role} onChange={(e) => setRole(e.target.value)} className='select text-gray-400'>
                                        <option value="" disabled>
                                            -- Select Role --
                                        </option>
                                        <option value="admin">Admin</option>
                                        <option value="applicant">Applicant</option>
                                        <option value="staff">Staff</option>
                                    </select>
                                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>


                                </form>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section >


    );
}
export default AdminAccount;