import { Link, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";


const Navbar = ({ token, setToken }) => {
    const [role, setRole] = useState(null);




    const navigate = useNavigate();

    const HandleLogOut = () => {


        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    }
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        setLoading(true);
        let roles = "";
        if (token) {
            try {
                const decoded = jwtDecode(token);
                roles = decoded.role;
                console.log("role:", roles);


                setRole(roles);


            } catch (e) {
                setRole(null);
                console.error("Invalid token", e);
            }
        } else {

            console.log("unable to get token")
        }
        setLoading(false);
    }, [token]);

    if (loading) {
        return <div>Loading application...</div>;
    }


    return (
        <>
            <div className='navbar bg-gray-900 shadow-sm'>
                <div className='navbar-start'>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link to='/' className='text-black'>View Appointments</Link></li>
                            <li><Link to='/booking' className='text-black'>Book an appointment</Link></li>
                            <li><Link to='/account' className='text-black'>Account Info</Link></li>
                            {role === "admin" ? <li><Link to='/adminac' className='text-black'>Admin Account Access</Link></li> : null}

                        </ul>
                    </div>

                </div>
                <div className="navbar-center">
                    {!token && (
                        <Link to='/' className="btn btn-ghost text-xl text-white">Appointment App</Link>
                    )}
                    {token && (
                        <Link to='/appointments' className="btn btn-ghost text-xl text-white">Appointment App</Link>
                    )}
                </div>

                <div className="navbar-end">
                    {!token && (
                        <div className='space-x-1'>
                            <Link to="/login">
                                <button className="text-white btn btn-info">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="text-white btn btn-info">Register</button>
                            </Link>
                        </div>
                    )}
                    {token && (
                        <div className='space-x-1'>
                            <Link to="/login">
                                <button onClick={HandleLogOut} className="text-white btn btn-error">Logout</button>
                            </Link>


                        </div>
                    )}

                </div>


            </div>
        </>
    )
}
export default Navbar;