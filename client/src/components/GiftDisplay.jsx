import React from 'react';
import "./giftDisplay.css"
// const giftImageUrl = '/path/to/your/image.png'; // Adjust the path as necessary

const GiftDisplay = ({ onBuy }) => {
    const giftImageUrl = '/valentineBox.webp';


  return (
    <div className="giftDisplay">
      <h2>HERE IS A GIFT FOR YOU!</h2>
      <img src={giftImageUrl} alt="Valentine's Day Gift" className="giftImage" />
      <button onClick={onBuy} className="buyButton">LINK TO BUY THIS</button>
    </div>
  );
};

export default GiftDisplay;
