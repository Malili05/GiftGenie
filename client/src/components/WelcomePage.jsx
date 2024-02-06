import React from 'react';
import { useNavigate } from 'react-router-dom';
import lampImage from '/Lamp.webp';

const WelcomePage = () => {
  const navigate = useNavigate(); 
  // This will become goToQuestion
  const goToQuestion = () => {
    navigate('/Queries');
  };

  const goToLogin = () => {
    navigate('/Login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 px-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">WELCOME TO GIFT GENIE</h1>
      <img 
        src={lampImage} 
        alt="Genie Lamp" 
        className="max-w-xs w-full h-auto mb-4 cursor-pointer"
        onClick={goToQuestion}
      />
      <button 
      onClick={goToLogin}
      className="mt-4 px-6 py-2 bg-blue-900 text-white 
      font-bold rounded hover:bg-blue-800 focus:outline-none 
      focus:ring-2 focus:ring-opacity-50">
        Login
      </button>
    </div>
  );
};

export default WelcomePage;
