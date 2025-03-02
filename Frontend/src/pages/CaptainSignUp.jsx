import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [userData, setUserData] = useState({
        fullName: {
            firstName: '',
            lastName: ''
        },
        email: '',
        password: ''
    });

    const submitHandler = (e) => {
        e.preventDefault();

        setUserData({
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password
        });

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');

        console.log(userData);
    }

    return (
        <div>
            <div className='h-screen p-7 flex justify-between flex-col'>
                <div>
                    <img className='h-13 mb-4 mt-[-0.5rem]' src='https://www.svgrepo.com/show/505031/uber-driver.svg' />
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <h3 className='text-lg font-medium mb-2'>What's our Captain's name?</h3>
                        <div className='flex gap-3 mb-5'>
                            <input
                                className='bg-[#EEEEEE] text-base placeholder:text-sm rounded px-4 py-2 w-1/2'
                                required
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                            />

                            <input
                                className='bg-[#EEEEEE] text-base placeholder:text-sm rounded px-4 py-2 w-1/2'
                                required
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                            />
                        </div>

                        <h3 className='text-lg font-medium mb-2'>What's our Captain's E-mail?</h3>
                        <input
                            className='bg-[#EEEEEE] mb-5 text-base placeholder:text-sm rounded px-4 py-2 w-full'
                            required
                            type="email"
                            placeholder="email@exxample.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />

                        <h3 className='text-lg font-medium mb-2'>Enter Password?</h3>
                        <input
                            className='bg-[#EEEEEE] mb-5 text-base placeholder:text-sm rounded px-4 py-2 w-full'
                            required
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />

                        <button
                            className='bg-black mb-4 text-white text-base font-semibold placeholder:text-sm rounded px-4 py-2 w-full'
                        >
                            Login
                        </button>

                        <p className='text-center'>Already have an account? <Link to="/captain-login" className='mb-3 text-blue-600'>Login here</Link></p>
                    </form>
                </div>
                <div>
                    <p className='text-[0.6rem] text-center leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means from Uber ans its affiliates to the number provided</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainSignUp