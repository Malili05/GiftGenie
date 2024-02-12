import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth'; // Adjust the path as necessary

const Navbar = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/Profile');
  };

  const goToLogin = () => {
    navigate('/Login');
  };

  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="font-bold text-xl">Gift Genie</h1>
      {AuthService.loggedIn() ? (
        <button
          onClick={goToProfile}
          className="px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{ backgroundColor: 'transparent', color: 'black' }}
        >
          Profile
        </button>
      ) : (
        <button
          onClick={goToLogin}
          className="px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{ backgroundColor: 'transparent', color: 'black' }}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
