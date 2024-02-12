import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToProfile = () => {
    navigate('/Profile');
  };

  const goToLogin = () => {
    navigate('/Login');
  };

  const goToHome = () => {
    navigate('/');
  };

  // Function to determine whether to show login/profile buttons based on current route
  const shouldShowButtons = () => {
    // Check if the current path is not '/Login' or '/SignUp'
    return location.pathname !== '/Login' && location.pathname !== '/SignUp';
  };

  return (
    <div className="flex justify-between items-center w-full mt-0 mb-10">
      {/* Clickable Logo */}
      <h1 className="cursor-pointer"
          style={{ 
            textShadow: "0 0 5px black",
            color: "#F7D56A",
            fontSize: "36px",
            transition: "color 0.3s ease-in-out, transform 0.3s ease-in-out", // Added transition for color and transform
            cursor: "pointer",
          }} 
          onClick={goToHome}
          onMouseEnter={(e) => {
            e.target.style.color = '#FFD700'; // Change text color to yellow on hover
            e.target.style.transform = 'scale(1.5)'; // Grow the text on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#F7D56A'; // Restore text color on mouse leave
            e.target.style.transform = 'scale(1)'; // Reset the scale on mouse leave
          }}
      >
        Gift Genie
      </h1>
      {AuthService.loggedIn() && shouldShowButtons() && (
        <button
          onClick={goToProfile}
          className="px-4 py-2 rounded text-blue-800 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 hover:text-yellow-500 transform hover:scale-105" // Removed background and added text color
          style={{ borderRadius: "20px", marginTop: "-5px" }}
        >
          <span style={{ lineHeight: "1.5", letterSpacing: "1px", position: "relative"}}>PROFILE</span>
        </button>
      )}
      {!AuthService.loggedIn() && shouldShowButtons() && (
        <button
          onClick={goToLogin}
          className="px-5 py-2 rounded text-blue-800 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 hover:text-yellow-500 transform hover:scale-105" // Removed background and added text color
          style={{ borderRadius: "20px", marginTop: "-5px" }}
        >
          <span style={{ lineHeight: "1.5", letterSpacing: "1px", position: "relative"}}>LOG IN</span>
        </button>
      )}
    </div>
  );
};

export default Navbar;
