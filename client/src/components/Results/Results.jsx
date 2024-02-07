import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Results = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedAnswers } = location.state || {};

    const handleBackToQueries = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <div className="results-container bg-gray-100 p-5 rounded-lg shadow-md w-full max-w-md mx-auto">
                <h2 className="text-lg font-semibold mb-4">Selected Keywords</h2>
                {selectedAnswers && Object.entries(selectedAnswers).map(([questionId, answer], index) => (
                    <p key={questionId} className="text-md font-medium">Keyword {index + 1}: {answer}</p>
                ))}

                <GiftDisplay onBuy={() => console.log('Buying the gift...')} />
            </div>

            <button onClick={handleBackToQueries} className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
                Start Over
            </button>
        </div>
    );
};

const GiftDisplay = ({ onBuy }) => {
    const giftImageUrl = '/valentineBox.webp'; // Adjust the path as necessary

    return (
        <div className="giftDisplay my-4">
            <h2 className="font-semibold mb-2">HERE IS A GIFT FOR YOU!</h2>
            <img src={giftImageUrl} alt="Valentine's Day Gift" className="mx-auto w-1/2" />
            <button onClick={onBuy} className="mt-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300">LINK TO BUY THIS</button>
        </div>
    );
};

export default Results;


