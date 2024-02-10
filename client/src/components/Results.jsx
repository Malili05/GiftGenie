import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { GET_GIFTS_QUERY } from "../utils/queries";
import { SAVE_GIFT } from "../utils/mutations";
import AuthService from "../utils/auth";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedAnswers } = location.state || {};
  const keywords = selectedAnswers ? Object.values(selectedAnswers) : [];

  const { loading, error, data } = useQuery(GET_GIFTS_QUERY, {
    variables: { keywords },
    skip: !selectedAnswers,
  });

  const [saveGift, { loading: saving, error: saveError }] = useMutation(SAVE_GIFT);

  const randomGift = data && data.gifts.length > 0 
    ? data.gifts[Math.floor(Math.random() * data.gifts.length)] 
    : null;

  const [saveConfirmation, setSaveConfirmation] = useState("");

  const handleSaveGift = async (event) => {
    event.preventDefault();
    if (randomGift) {
      try {
        await saveGift({ variables: { giftId: randomGift._id } });
        setSaveConfirmation("Gift saved successfully!");
      } catch (error) {
        console.error("Error in saving gift:", error);
        setSaveConfirmation("Error saving gift.");
      }
    } else {
      console.error('No gift to save or missing gift ID');
    }
  };

  const handleBackToQueries = () => {
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/Profile");
  };

  const goToLogin = () => {
    navigate("/Login");
  };

  const handleTestButton = () => {
    alert("Hi");
  };

  if (loading || saving) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (saveError) return <p>Error in saving: {saveError.message}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="results-container bg-gray-100 p-5 rounded-lg shadow-md w-full max-w-md mx-auto">
        {randomGift && (
          <GiftDisplay
            key={randomGift._id}
            gift={randomGift}
            onSaveGift={handleSaveGift}
            saveConfirmation={saveConfirmation}
          />
        )}
      </div>

      {AuthService.loggedIn() && (
        <button
          onClick={goToProfile}
          className="mt-4 ml-2 px-6 py-2 bg-blue-900 text-white font-bold rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-opacity-50"
        >
          Profile
        </button>
      )}

      {!AuthService.loggedIn() && (
        <button
          onClick={goToLogin}
          className="mt-4 px-6 py-2 bg-blue-900 text-white font-bold rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-opacity-50"
        >
          Login
        </button>
      )}

      <button
        onClick={handleBackToQueries}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Start Over
      </button>
      {AuthService.loggedIn() && (
        <button
          onClick={handleTestButton}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-300"
        >
          Test Button
        </button>
      )}
    </div>
  );
};

const GiftDisplay = ({ gift, onSaveGift, saveConfirmation }) => (
  <div className="giftDisplay my-8">
    <h2 className="font-semibold text-xl mb-4">{gift.name}</h2>
    <img src={gift.image} alt={gift.name} className="mx-auto mb-4 w-1/2" />
    <p className="text-sm mb-2">{gift.description}</p>
    <p className="text-base font-semibold mb-2">Price: ${gift.price}</p>
    <a
      href={gift.buyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
    >
      BUY THIS
    </a>
    {AuthService.loggedIn() && (
      <button
        type="button"
        onClick={(e) => onSaveGift(e)}
        className="mt-4 px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-opacity-50"
      >
        Save Gift
      </button>
    )}
    {saveConfirmation && <p className="text-green-500 mt-2">{saveConfirmation}</p>}
  </div>
);

GiftDisplay.propTypes = {
  gift: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    buyUrl: PropTypes.string.isRequired,
  }).isRequired,
  onSaveGift: PropTypes.func.isRequired,
  saveConfirmation: PropTypes.string,
};

export default Results;
