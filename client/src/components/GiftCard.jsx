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

  return (
    <div className="gift-card border border-gray-300 rounded p-4 mb-4">
      <div className="image-container mb-2">
        <img src={gift.image} alt={gift.name} className="object-contain" />
      </div>
      <div className="details-container">
        <div className="mb-1">
          <p>Name: {gift.name}</p>
          <p>Price: ${gift.price}</p>
        </div>
        <div className="flex justify-between items-center">
          <button onClick={handleDelete} className="mr-2">
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
          <a href={gift.buyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">Buy</a>
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
