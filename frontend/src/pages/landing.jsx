import React from 'react';
import { Link } from 'react-router-dom';


const Landing = () => {
    return (
        <section className="flex flex-col text-center h-screen bg-gray-700 pt-10 pb-10">

            <div className='pt-10 pb-10'>
                <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>YOUR ONE STOP APPOINTMENT BOOKING SOLUTION</h1>
            </div>
            <div className='m-auto max-w-4xl max-h-4xl overflow-hidden rounded-xl shadow-md'>
                <img
                    className='w-full h-full object-cover'
                    src='stock-img.jpg' />
            </div>
            <div className='pt-10 mx-60'>
                <p className='text-gray-900 dark:text-white'>Whether it's locking in a quick haircut, a doctor's visit, or planning something bigger, we've got you covered.
                    Our booking system is fast, easy, and built to keep things stress free. Just log in, pick your time, and you're good to go — no endless calls, no hassle, just done.
                </p>
            </div>

        </section>
    );
}

export default Landing;