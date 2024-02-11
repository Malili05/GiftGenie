import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { DELETE_GIFT, UPDATE_GIFT_PRIORITY } from '../utils/mutations'; 
import { QUERY_USER } from '../utils/queries';
import { useState } from 'react';

const GiftCard = ({ gift }) => {
  const [deleteGift] = useMutation(DELETE_GIFT, {
    variables: { giftId: gift._id },
    refetchQueries: [{ query: QUERY_USER }],
    onCompleted: () => console.log(`Gift with ID ${gift._id} deleted.`),
    onError: (error) => console.error(`Error deleting gift: ${error.message}`)
  });

  const [updatePriority] = useMutation(UPDATE_GIFT_PRIORITY); 
  const [isChecked, setIsChecked] = useState(!!gift.priority);

  const handleDelete = () => {
    deleteGift();
  };

  const handlePriorityChange = (event) => {
    event.preventDefault(); 
    const newPriority = event.target.checked;
    updatePriority({ variables: { giftId: gift._id, priority: newPriority } });
    setIsChecked(newPriority);
  };

  const cardStyle = {
    backgroundColor: isChecked ? 'purple' : 'white',
    boxShadow: isChecked ? '0 0 10px purple' : 'none'
  };

  return (
    <div className="gift-card flex flex-col items-center justify-center border border-gray-300 rounded p-4 mb-4 transition-transform duration-300 hover:scale-105 bg-white" style={cardStyle}>
      <div className="image-container w-40 h-40 mb-2">
        <img src={gift.image} alt={gift.name} className="gift-image object-contain h-full w-full" />
      </div>
      <div className="details-container text-center">
        <div className="price-container mb-1">
          <p className="price">${gift.price}</p>
        </div>
        <div className="flex justify-between items-center px-4">
          <button onClick={handleDelete} className="delete-button border border-gray-300 rounded p-2 mr-">
            <FontAwesomeIcon icon={faTrash} className="text-red-600" />
          </button>
          <div className="flex flex-col items-center">
            <input
              id={`priority-checkbox-${gift._id}`}
              type="checkbox"
              checked={isChecked} 
              onChange={handlePriorityChange} 
            />
            <label htmlFor={`priority-checkbox-${gift._id}`} className="mb-2">Must Have</label>
          </div>
          <a href={gift.buyUrl} target="_blank" rel="noopener noreferrer" className="buy-button text-blue-600 font-bold py-2 px-4 border border-blue-600 rounded">Buy</a>
        </div>
      </div>
    </div>
  );
};

GiftCard.propTypes = {
  gift: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    buyUrl: PropTypes.string,
    priority: PropTypes.bool 
  }).isRequired,
};

export default GiftCard;
