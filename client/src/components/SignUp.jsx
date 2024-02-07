import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    });

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle Signup logic
    console.log(formData); // Just for demonstration, replace this with actual sign-up logic

    // After sign-up, redirect the user to the questions
    navigate('/Queries');
    };

    return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 px-40">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Make an account!</h1>
        <form className="w-full max-w-xs" onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-blue-800 text-sm font-bold mb-2" htmlFor="name">
            Name
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            />
        </div>
        <div className="mb-4">
            <label className="block text-blue-800 text-sm font-bold mb-2" htmlFor="email">
            Email
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            />
        </div>
        <div className="flex items-center justify-center">
            <button
            className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            >
            Sign Up
            </button>
        </div>
        </form>
        <p className='mt-4'>
            Already have an account?
            <button 
                    onClick={() => navigate('/Login')} 
                    className="text-blue-800 hover:text-blue-600 underline pl-2"
                >Log in </button>
        </p>
        <p className='mt-4'>
            Want a gift without an account?
            <button 
                    onClick={() => navigate('/')} 
                    className="text-blue-800 hover:text-blue-600 underline pl-2"
                >Check it out!</button>
        </p>
    </div>
    );
};

export default Signup;
