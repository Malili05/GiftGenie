import React, { useState } from 'react';
import './App.css'; 
import Header from './components/Header';
import LoginButton from './components/LoginButton';
import PreferenceSelector from './components/PreferenceSelector';
import GiftDisplay from './components/GiftDisplay';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Dummy data for preferences and gifts
  const preferences = ['A gift', 'Another Gift', 'A way cooler gift'];
  const gift = { link: '#' };

  const handleLogin = () => {
    // TODO: Implement login logic
    setIsLoggedIn(true);
  };

  const handleSelectPreference = (preference) => {
    // TODO: Implement preference selection logic
    console.log(preference);
  };

  const handleBuyGift = (link) => {
    // TODO: Implement buy gift logic
    window.open(link, '_blank');
  };

  return (
    <div className="app">
      <Header />
      {!isLoggedIn && <LoginButton onLogin={handleLogin} />}
      {isLoggedIn && (
        <>
          <PreferenceSelector preferences={preferences} onSelectPreference={handleSelectPreference} />
          <GiftDisplay gift={gift} onBuy={handleBuyGift} />
        </>
      )}
    </div>
  );
}

export default App;
