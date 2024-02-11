import React from 'react';

const GiftCard = ({ gift }) => {
  return (
    <div className="gift-card flex flex-col items-center justify-center">
      <div className="image-container w-40 h-40 mb-2"> 
        <img src={gift.image} alt={gift.name} className="gift-image object-contain h-full w-full" /> 
      </div>
      <div className="details-container text-center">
        <div className="price-container mb-1"> 
          <p className="price">${gift.price}</p>
        </div>
        <div className="buy-container"> 
          <a href={gift.buyUrl} target="_blank" rel="noopener noreferrer" className="buy-button text-blue-600 font-bold">Buy</a> 
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
