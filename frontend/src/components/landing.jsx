import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <h1>Appointment Booking app</h1>
            <button to='/login'>Login</button>
            <button to='/register'>Register</button>
        </div>
    );
}

export default Landing;