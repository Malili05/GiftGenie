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
  const giftCardSize = 300; 
  const numberOfGifts = data?.user?.savedGifts?.length || 0;
  const numberOfRows = Math.ceil(numberOfGifts / 5);
  const numberOfColumns = Math.min(numberOfGifts, 5);
  const containerHeight = Math.min(Math.max((numberOfRows * giftCardSize), 300), window.innerHeight * 0.6); 
  const containerWidth = Math.max(numberOfColumns * giftCardSize, 300);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 px-4">
      <div className="inline-block rounded-full overflow-hidden w-40 h-40 border-4 border-blue-900 mb-4">
        <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
      </div>
      <h1 className="text-4xl font-bold text-blue-800 mb-4">{profileName}'s Profile</h1>
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Saved Gifts</h2>
      <div className={`gifts-container overflow-auto border-2 border-gray-800 rounded-lg shadow-lg p-4`} style={{ height: `${containerHeight}px`, maxWidth: `${containerWidth}px`, display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
        <div className={`grid grid-cols-${numberOfColumns} gap-4`}>
          {hasSavedGifts ? (
            data.user.savedGifts.map((gift, index) => (
              <div key={gift._id || index} className="bg-white border border-gray-200 rounded-lg shadow-sm transition-transform duration-300 transform hover:scale-105 w-40"> 
                <GiftCard gift={gift} />
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-700 text-center">You don't have any saved gifts yet.</p>
          )}
        </div>
      </div>
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
