import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Search.css';
import questionsData from './Questions'; 

function Queries() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOtherInput, setShowOtherInput] = useState(false);

  const navigate = useNavigate(); // Create navigate function for redirecting

  // Shuffle the questionsData array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    const shuffledQuestions = shuffleArray(questionsData).slice(0, 3);
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswerSelection = (questionId, answer) => {
    setShowOtherInput(answer === 'Other');
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const handleOtherInputChange = (event) => {
    setSelectedAnswers({ ...selectedAnswers, [questions[currentIndex].id]: event.target.value });
  };

  const handleNextQuestion = () => {
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
      setShowOtherInput(false);
    } else {
      console.log('Selected Answers:', selectedAnswers);
      navigate('/results', { state: { selectedAnswers } }); // Redirect to the Results page with state
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="queries-container">
      <h1>Welcome to the Queries Page</h1>
      {currentQuestion && (
        <div className="question-box">
          <h2>Question {currentIndex + 1}</h2>
          <p>{currentQuestion.question}</p>
          <form>
            {Object.entries(currentQuestion.answers).map(([answerKey, answerText]) => (
              <div key={answerKey}>
                <input
                  type="radio"
                  id={`${answerKey}-${currentQuestion.id}`}
                  name={`answer-${currentQuestion.id}`}
                  value={answerKey}
                  checked={selectedAnswers[currentQuestion.id] === answerKey}
                  onChange={() => handleAnswerSelection(currentQuestion.id, answerKey)}
                />
                {answerKey === 'Other' && selectedAnswers[currentQuestion.id] === 'Other' && (
                  <input
                    type="text"
                    placeholder="Enter one word"
                    value={selectedAnswers[currentQuestion.id] || ''}
                    onChange={handleOtherInputChange}
                  />
                )}
                {answerKey === 'Other' && !showOtherInput && (
                  <button
                    onClick={() => handleAnswerSelection(currentQuestion.id, 'Other')}
                    type="button"
                  >
                    Other
                  </button>
                )}
                <label htmlFor={`${answerKey}-${currentQuestion.id}`}>{answerText}</label>
              </div>
            ))}
          </form>
          <button onClick={handleNextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
}

export default Queries;
