import React from 'react';

const GiftCard = ({ gift }) => {
  return (
    <div className="gift-card flex flex-col justify-between">
      <div className="image-container mb-2 h-40">
        <img src={gift.image} alt={gift.name} className="gift-image object-contain w-full h-full" />
      </div>
      <div className="price-container">
        <p className="gift-price text-lg font-bold flex justify-center items-center h-full">${gift.price}</p>
      </div>
    </div>
  );
};

export default GiftCard;
