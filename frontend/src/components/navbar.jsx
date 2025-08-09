import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({token,setToken}) => {
    
  
    const navigate = useNavigate();

    const HandleLogOut = () => {
        

        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
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
                            <li><a>Homepage</a></li>
                            <li><a>Portfolio</a></li>
                            <li><a>About</a></li>
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