import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth';

const Profile = () => {
  const navigate = useNavigate();

  // Example state for profile name, saved items, and profile image URL
  const [profileName, setProfileName] = useState('John Doe');
  const [savedItems, setSavedItems] = useState(['Item 1', 'Item 2', 'Item 3']); 
  const randomImgUrl = () => {
    const images = [
      '/clippygenie1.webp',
      '/clippygenie2.webp',
      '/clippygenie3.webp',
      '/clippygenie4.webp',
      '/clippygenie5.webp',
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };
  const profileImageUrl = randomImgUrl();

  const goToWelcomePage = () => {
    navigate('/');
  };

  const logout = () => {
    AuthService.logout(); // Call the logout method from AuthService
    navigate('/Login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 px-4">
      <div className="inline-block rounded-full overflow-hidden w-40 h-40 border-4 border-blue-900 mb-4">
        <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
      </div>
      <h1 className="text-4xl font-bold text-blue-800 mb-4">{profileName}'s Profile</h1>
      <ul className="list-disc text-left mb-4">
        {savedItems.map((item, index) => (
          <li key={index} className="text-blue-800">{item}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={goToWelcomePage}
          className="px-6 py-2 bg-blue-900 text-white font-bold rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50 mx-4"
        >
          Back to Home
        </button>
        <button
          onClick={logout}
          className="px-6 py-2 bg-blue-900 text-white font-bold rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
