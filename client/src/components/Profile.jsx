import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import AuthService from '../utils/auth';
import { QUERY_USER } from '../utils/queries';
import GiftCard from './GiftCard'; // Import the GiftCard component

const Profile = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(QUERY_USER);

  const [profileName, setProfileName] = useState('');

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

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      navigate('/login');
    } else if (data) {
      setProfileName(data.user.username);
    }
  }, [navigate, data]);

  const goToWelcomePage = () => {
    navigate('/');
  };

  const logout = () => {
    AuthService.logout();
    navigate('/Login');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Calculate the number of columns based on the number of items
  const numItems = data.user.savedGifts.length;
  const numCols = numItems > 5 ? 5 : numItems;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 px-4">
      <div className="inline-block rounded-full overflow-hidden w-40 h-40 border-4 border-blue-900 mb-4">
        <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
      </div>
      <h1 className="text-4xl font-bold text-blue-800 mb-4">{profileName}'s Profile</h1>
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Saved Gifts</h2>
      <div className={`grid grid-cols-${numCols} gap-4`}> {/* Adjusted to dynamic number of columns */}
        {data.user.savedGifts.map((gift, index) => (
          <div key={gift._id || index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-transform duration-300 transform hover:scale-105 w-40"> {/* Added fixed size */}
            <GiftCard gift={gift} index={index} />
          </div>
        ))}
      </div>
      <div className="mt-8"> {/* Add margin top to create space */}
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
