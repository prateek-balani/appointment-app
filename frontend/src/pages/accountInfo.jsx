import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const isProduction = process.env.NODE_ENV === "production";


const AccountInfo = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [emails, setEmails] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    let userId = 0;


    if (token) {
        const decoded = jwtDecode(token);
        userId = decoded.id;
        console.log("userid", userId);

    }

    const editUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(isProduction ? `/api/users/${userId}` : `http://localhost:5050/api/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName: fname, lastName: lname, email: emails }),

            });
            if (!response.ok) {
                console.log("failed to add user info");
                throw new Error(`Error: ${response.statusText}`);

            }
            else {
                alert("data updated succesfully");
                window.location.reload();
                navigate("/account");
            }



        }
        catch (err) {
            console.log(err.message);

        }


    }





    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await fetch(isProduction ? `/api/users/${userId}` : `http://localhost:5050/api/users/${userId}`);
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
                {!isEditing ? (
                    <div className="info-part">
                        <table className="w-full text-center text-gray-900 dark:text-white">
                            <thead>
                                <tr>
                                    <th className="text-base font-semibold text-center text-gray-900 dark:text-white">First Name:</th>
                                    <th className="text-base font-semibold text-center text-gray-900 dark:text-white">Last Name:</th>
                                    <th className="text-base font-semibold text-center text-gray-900 dark:text-white">Email:</th>
                                    <th className="text-base font-semibold text-center text-gray-900 dark:text-white">Role:</th>

                                </tr>
                            </thead>
                            <tbody>
                                {userInfo.map((user) => (
                                    <tr key={user.id} className="border-t border-gray-300 dark:border-gray-700">
                                        <td className="px-4 py-2">{user.firstName}</td>
                                        <td className="px-4 py-2">{user.lastName}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="btn btn-info" onClick={() => { setFname(userInfo.firstName); setLname(userInfo.lastName); setEmails(userInfo.email); setIsEditing(true); }}>Edit</button>
                    </div>
                ) : (
                    <div className="edit-part">
                        {userInfo.map((user) => (
                            <form onSubmit={editUser} className="flex flex-col space-y-2">
                                <label htmlFor="firstName" className="text-base font-semibold text-center text-gray-900 dark:text-white">First Name: </label> <input type="text" className="input" placeholder={user.firstName} value={fname} onChange={(e) => setFname(e.target.value)} />
                                <label htmlFor="lastName" className="text-base font-semibold text-center text-gray-900 dark:text-white">Last Name: </label><input type="text" className="input" placeholder={user.lastName} value={lname} onChange={(e) => setLname(e.target.value)} />
                                <label htmlFor="email" className="text-base font-semibold text-center text-gray-900 dark:text-white">Email: </label><input type="text" className="input" placeholder={user.email} value={emails} onChange={(e) => setEmails(e.target.value)} />


                                <button type="submit" className="btn btn-info">Submit</button>



                            </form>
                        ))}
                        <button className="btn btn-error" onClick={() => setIsEditing(false)}>Cancel</button>


                    </div>
                )}
            </div>
        </section>
    );

}
export default AccountInfo;