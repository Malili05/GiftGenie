import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleCreateAccountClick = () => {
        navigate('/SignUp');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-100 px-40">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <h1 className="mb-8 text-3xl text-center text-blue-800 font-bold">Log in</h1>
                <div className="mb-4">
                    <label className="block text-blue-800 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-blue-800 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleCreateAccountClick}
                    >
                        Make an Account
                    </button>
                </div>
            </div>
            <p className='mt-4'>
            Want to try it before you make an account?
            <button 
                    onClick={() => navigate('/')} 
                    className="text-blue-800 hover:text-blue-600 underline pl-2"
                >Back to home</button>
        </p>
        </div>
        
    );
};

export default Login;
