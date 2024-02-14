import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@apollo/client";
import { DELETE_GIFT, UPDATE_GIFT_PRIORITY } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import { useState } from "react";
import {
  faTrash,
  faHeart,
  faHeartBroken,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const GiftCard = ({ savedGift }) => {
  const { gift, priority } = savedGift;
  const [isChecked, setIsChecked] = useState(priority);

  const [deleteGift] = useMutation(DELETE_GIFT, {
    variables: { giftId: gift._id },
    refetchQueries: [{ query: QUERY_USER }],
    onCompleted: () => console.log(`Gift with ID ${gift._id} deleted.`),
    onError: (error) => console.error(`Error deleting gift: ${error.message}`),
  });

  const [updatePriority] = useMutation(UPDATE_GIFT_PRIORITY, {
    onCompleted: () =>
      console.log(`Priority updated for gift with ID ${gift._id}.`),
    onError: (error) =>
      console.error(`Error updating priority: ${error.message}`),
  });

  const handleDelete = () => {
    deleteGift();
  };

  const handlePriorityChange = () => {
    const newPriority = !isChecked;
    updatePriority({ variables: { giftId: gift._id, priority: newPriority } });
    setIsChecked(newPriority);
  };

  

  return (
    <div className="w-60 h-60 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="h-2/3">
        <img
          src={gift.image}
          alt={gift.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="h-1/3 w-full flex flex-col justify-between items-center p-2">
        <div className="flex justify-between items-center w-full">
          <button
            onClick={handleDelete}
            className={`text-lg ${
              isChecked
                ? "text-gray-400 cursor-not-allowed"
                : "text-red-600 hover:text-red-500"
            }`}
            disabled={isChecked}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button
            onClick={handlePriorityChange}
            className={`text-lg ${
              isChecked ? "text-red-600" : "text-gray-400"
            }`}
          >
            <FontAwesomeIcon icon={isChecked ? faHeart : faHeartBroken} />
          </button>
          <a
            href={gift.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
          </a>
        </div>
        <p className="text-lg text-gray-600 mt-2">${gift.price}</p>
      </div>
    </div>
  );
};

GiftCard.propTypes = {
  savedGift: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    gift: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      buyUrl: PropTypes.string,
    }).isRequired,
    priority: PropTypes.bool.isRequired,
  }).isRequired,
};

export default GiftCard;
