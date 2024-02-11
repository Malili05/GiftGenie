import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import AuthService from '../utils/auth';
import { QUERY_USER } from '../utils/queries';
import GiftCard from './GiftCard';

const Profile = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(QUERY_USER);

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
      refetch();
    }
  }, [navigate, data, refetch]);

  const goToWelcomePage = () => {
    navigate('/');
  };

  const logout = () => {
    AuthService.logout();
    navigate('/Login');
  };

  const goToSearchPage = () => {
    navigate('/search');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const hasSavedGifts = data && data.user.savedGifts && data.user.savedGifts.length > 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 px-4">
      {/* Profile Image */}
      <div className="w-32 h-32 relative rounded-full overflow-hidden mb-4 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64">
        <img src={profileImageUrl} alt="Profile" className="object-cover w-full h-full" />
      </div>

      {/* Profile Name */}
      <h1 className="text-4xl font-bold text-blue-800 mb-4">{profileName}&rsquo;s Profile</h1>

      {/* Saved Gifts */}
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Saved Gifts</h2>
      <div className="max-w-full overflow-auto border-2 border-gray-800 rounded-lg shadow-lg p-4" style={{ maxHeight: '400px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {hasSavedGifts ? (
            data.user.savedGifts.map((gift, index) => (
              <div key={gift._id || index} className="bg-white border border-gray-200 rounded-lg shadow-sm transition-transform duration-300 transform hover:scale-105">
                <GiftCard gift={gift} />
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-700 text-center">You don&rsquo;t have any saved gifts yet.</p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="text-center mt-4">
        <button
          onClick={goToSearchPage}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-400"
        >
          Search for More Gifts
        </button>
      </div>
      <div className="mt-8">
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
