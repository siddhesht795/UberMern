import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({
        email: '',
        password: ''
    });

    const submitHandler = (e) => {
        e.preventDefault();

        setCaptainData({
            email: email,
            password: password
        });
        console.log(captainData);

        setEmail('');
        setPassword('');
    }

    return (
        <div className='h-screen p-7 flex justify-between flex-col'>
            <div>
                <img className='h-13 mb-4 mt-[-0.5rem]' src='https://www.svgrepo.com/show/505031/uber-driver.svg' />
                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <h3 className='text-lg font-medium mb-2'>What's your E-mail?</h3>
                    <input
                        className='bg-[#EEEEEE] mb-7 text-lg placeholder:text-base rounded px-4 py-2 w-full'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        required
                        type="email"
                        placeholder="email@exxample.com"
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter Password?</h3>
                    <input
                        className='bg-[#EEEEEE] mb-7 text-lg placeholder:text-base rounded px-4 py-2 w-full'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        required
                        type="password"
                        placeholder="password"
                    />

                    <button
                        className='bg-black mb-4 text-white text-lg font-semibold placeholder:text-base rounded px-4 py-2 w-full'
                    >
                        Login
                    </button>

                    <p className='text-center'>Want to join our fleet? <Link to="/captain-signup" className='mb-3 text-blue-600'>Register as a Captain</Link></p>
                </form>
            </div>
            <div>
                <Link
                    to='/login'
                    className='flex justify-center items-center bg-[#e0d468] text-black text-lg font-semibold placeholder:text-base rounded px-4 py-2 w-full'
                >
                    Sign in as User
                </Link>
            </div>
        </div>
    )
}

export default CaptainLogin