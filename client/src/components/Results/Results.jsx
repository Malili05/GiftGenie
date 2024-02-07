import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./results.css";

const Results = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedAnswers } = location.state || {};

    const handleBackToQueries = () => {
        navigate('/'); // Adjust the path as necessary
    };

    return (
        <div>
            <div className="results-container">
                {/* Displaying selected keywords */}
                <div className="selected-keywords">
                    <h2>Selected Keywords</h2>
                    {selectedAnswers && Object.entries(selectedAnswers).map(([questionId, answer], index) => (
                        <p key={questionId}>Keyword {index + 1}: {answer}</p>
                    ))}
                </div>

                {/* GiftDisplay component */}
                <GiftDisplay onBuy={() => console.log('Buying the gift...')} />
            </div>

            {/* Back to Queries button */}
            <button onClick={handleBackToQueries} className="back-button">
                Start Over
            </button>
        </div>
    );
};

const GiftDisplay = ({ onBuy }) => {
    const giftImageUrl = '/valentineBox.webp'; // Adjust the path as necessary

    return (
        <div className="giftDisplay varela-round-regular">
            <h2>HERE IS A GIFT FOR YOU!</h2>
            <img src={giftImageUrl} alt="Valentine's Day Gift" className="giftImage" />
            <button onClick={onBuy} className="buyButton">LINK TO BUY THIS</button>
        </div>
    );
};

export default Results;

