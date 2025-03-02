import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserSignUp from './UserSignUp'

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const submitHandler = (e) => {
        e.preventDefault();

        setUserData({
            email: email,
            password: password
        });

        setEmail('');
        setPassword('');
    }

    return (
        <div className='h-screen p-7 flex justify-between flex-col'>
            <div>
                <img className='w-15 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
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

                    <p className='text-center'>New here? <Link to="/signup" className='mb-3 text-blue-600'>Create new Account</Link></p>
                </form>
            </div>
            <div>
                <Link
                    to='/captain-login'
                    className='flex justify-center items-center bg-[#10b462b4] text-black text-lg font-semibold placeholder:text-base rounded px-4 py-2 w-full'
                >
                    Sign in as Captain
                </Link>
            </div>
        </div>
    )
}

export default UserLogin;