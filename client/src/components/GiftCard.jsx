import React from 'react';

const GiftCard = ({ gift }) => {
  return (
    <div className="gift-card flex flex-col items-center justify-center">
      <div className="image-container w-40 h-40 mb-2"> {/* Set fixed size for image container */}
        <img src={gift.image} alt={gift.name} className="gift-image object-contain h-full w-full" /> {/* Adjust image to fit container */}
      </div>
      <div className="details-container text-center">
        <div className="price-container mb-1"> {/* Center the price text */}
          <p className="price">${gift.price}</p>
        </div>
        <div className="buy-container"> {/* Center the buy text */}
          <a href={gift.buyUrl} target="_blank" rel="noopener noreferrer" className="buy-button text-blue-600 font-bold">Buy</a> {/* Change color and style */}
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
