import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';


const GET_GIFTS_QUERY = gql`
  query GetGifts($keywords: [String]) {
    gifts(keywords: $keywords) {
      _id
      name
      description
      image
      price
      buyUrl
    }
  }
`;

const Results = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedAnswers } = location.state || {};

    
    const keywords = selectedAnswers ? Object.values(selectedAnswers) : [];

    
    const { loading, error, data } = useQuery(GET_GIFTS_QUERY, {
        variables: { keywords },
        skip: !selectedAnswers 
    });

    
    const randomGift = data && data.gifts.length > 0 
        ? data.gifts[Math.floor(Math.random() * data.gifts.length)] 
        : null;

    const handleBackToQueries = () => {
        navigate('/');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <div className="results-container bg-gray-100 p-5 rounded-lg shadow-md w-full max-w-md mx-auto">
                <h2 className="text-lg font-semibold mb-4">Selected Keywords</h2>
                {selectedAnswers && Object.entries(selectedAnswers).map(([questionId, answer], index) => (
                    <p key={questionId} className="text-md font-medium">Keyword {index + 1}: {answer}</p>
                ))}

                {randomGift && <GiftDisplay key={randomGift._id} gift={randomGift} onBuy={() => console.log('Buying the gift...')} />}
            </div>

            <button onClick={handleBackToQueries} className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
                Start Over
            </button>
        </div>
    );
};

const GiftDisplay = ({ gift, onBuy }) => {
    return (
        <div className="giftDisplay my-4">
            <h2 className="font-semibold mb-2">{gift.name}</h2>
            <img src={gift.image} alt={gift.name} className="mx-auto w-1/2" />
            <p>{gift.description}</p>
            <button onClick={onBuy} className="mt-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300">LINK TO BUY THIS</button>
        </div>
    );
};

export default Results;
