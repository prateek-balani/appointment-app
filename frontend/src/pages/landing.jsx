import React from 'react';
import { Link } from 'react-router-dom';


const Landing = () => {
    return (
        <section className="flex flex-col text-center bg-gray-700 pt-10 pb-10">

            <div className='mt-10 mb-10'>
                <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>YOUR ONE STOP APPOINTMENT BOOKING SOLUTION</h1>
            </div>
            <div className='m-auto max-w-4xl max-h-4xl rounded-xl shadow-md'>
                <img
                    className='w-full h-full object-cover'
                    src='stock-img.jpg' />
            </div>
            <div className='mt-10 mx-60'>
                <p className='text-gray-900 dark:text-white'>Whether it's locking in a quick haircut, a doctor's visit, or planning something bigger, we've got you covered.
                    Our booking system is fast, easy, and built to keep things stress free. Just log in, pick your time, and you're good to go — no endless calls, no hassle, just done.
                </p>
            </div>
            <div className='mt-10 mb-10'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>WHAT WE PROVIDE</h1>
                <div className='mt-10 mx-60'>
                    <p className='text-gray-900 dark:text-white'> We provide a seamless, hassle free appointment booking service which is as easy as pushing a button.
                        Our services are designed to bhe user friendly and a one-stop-soluton for all of your booking needs. 
                        Create an account now to get started.
                    </p>
                </div>
            </div>
            <div className='mt-10 mb-10'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>EASY TO USE</h1>
                <div className='mt-10 mx-60'>
                    <p className='text-gray-900 dark:text-white'> If you don't believe us, just check out the 500+ five-star reviews from people who’ve already used our platform. 
                        They'll tell you how easy it is to book, how smooth the whole process feels, and why they keep coming back. 
                        See for yourself why we're the go-to choice for hassle-free scheduling.
                    </p>
                </div>
            </div>

        </section>
    );
}

export default Landing;