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

    // This will be where we link to the create account component
    // const handleCreateAccountClick = () => {
    // // Logic to handle account creation
    // navigate('/create-account');
    // };

    return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 p-4">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="mb-8 text-3xl text-center">Log in</h1>
        <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
            Username
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            />
        </div>
        <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
            Password
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={handlePasswordChange}
            />
        </div>
        <div className="flex items-center justify-between">
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            // onClick={handleCreateAccountClick}
            >
            Make an Account
            </button>
        </div>
        </div>
        </div>
    );
};

export default Login;
