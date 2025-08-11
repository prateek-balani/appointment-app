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
            <div className="w-full max-w-3xl p-16 space-y-12 bg-black rounded-lg shadow-lg dark:bg-gray-800">
                <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Account info</h1>
                <div className="info-part">
                    <table className="w-full text-center text-gray-900 dark:text-white">
                        <thead>
                            <tr>
                                <th className="text-base font-semibold text-center text-gray-900 dark:text-white">ID:</th>
                                <th className="text-base font-semibold text-center text-gray-900 dark:text-white">First Name:</th>
                                <th className="text-base font-semibold text-center text-gray-900 dark:text-white">Last Name:</th>
                                <th className="text-base font-semibold text-center text-gray-900 dark:text-white">Email: </th>
                                <th className="text-base font-semibold text-center text-gray-900 dark:text-white">Role: </th>



                            </tr>
                        </thead>
                        <tbody>
                            {userInfo.map((user) => (
                                <tr key={user.id} className="border-t border-gray-300 dark:border-gray-700">
                                    <td className="px-4 py-2">  {user.id}</td>
                                    <td className="px-4 py-2">  {user.firstName}</td>
                                   <td className="px-4 py-2">  {user.lastName}</td>
                                    <td className="px-4 py-2"> {user.email}</td>
                                    <td className="px-4 py-2"> <form onSubmit={(e) => editRole(e, user.id)}>



                                        <select id={`role-${user.id}`} value={role} onChange={(e) => setRole(e.target.value)} className='select text-gray-400'>
                                            <option value="" disabled>
                                                -- Select Role --
                                            </option>
                                            <option value="admin">Admin</option>
                                            <option value="applicant">Applicant</option>
                                            <option value="staff">Staff</option>
                                        </select>
                                        


                                    </form></td>
                                    <td className="px-4 py-2"> <button type="submit" className="btn btn-info">Update</button></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section >


    );
}
export default AdminAccount;