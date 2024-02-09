import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import lampImage from '/Lamp.webp';
import AuthService from '../utils/auth'; // Import your AuthService

const WelcomePage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const goToQuestion = () => {
    navigate('/Search');
  };

  const goToProfile = () => {
    navigate('/Profile');
  };

  const goToLogin = () => {
    navigate('/Login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 px-4">
      <div className="relative">
        <img
          src={lampImage}
          alt="Genie Lamp"
          className="max-w-xs w-full h-auto mb-4 cursor-pointer"
          onClick={goToQuestion}
        />
        <div className="absolute top-0 right-0 m-4">
          <HiQuestionMarkCircle
            className="text-4xl cursor-pointer"
            color="#1E40AF"
            onMouseEnter={() => setShowModal(true)}
            onMouseLeave={() => setShowModal(false)}
          />
          {showModal && (
            <div 
              style={{ 
                position: 'absolute', 
                top: '50px', 
                right: '0', 
                transition: 'opacity 300ms ease-in-out', 
                opacity: 1, 
                zIndex: 10,
                width: '200px', 
                height: '200px'
              }} 
              className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-center"
            >
              {/* Conditionally render text based on authentication status */}
              <p>
                Click the Lamp to find a gift or {AuthService.loggedIn() ? 'click on the profile button to visit your profile' : 'click Login below to sign in to your account'}
              </p>
            </div>
          )}
        </div>
      </div>
      <h1 className="text-4xl font-bold text-blue-800 mb-4">WELCOME TO GIFT GENIE</h1>
      {AuthService.loggedIn() ? (
        <button
          onClick={goToProfile}
          className="mt-4 px-6 py-2 bg-blue-900 text-white font-bold rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-opacity-50"
        >
          Profile
        </button>
      ) : (
        <button
          onClick={goToLogin}
          className="mt-4 px-6 py-2 bg-blue-900 text-white font-bold rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-opacity-50"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default WelcomePage;
