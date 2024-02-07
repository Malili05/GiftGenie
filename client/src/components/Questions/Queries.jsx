import React, { useState, useEffect } from 'react';
import './Queries.css';
import questionsData from './Questions'; // Import questionsData from the other file

function Queries() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOtherInput, setShowOtherInput] = useState(false); // State to show/hide the "Other" input field
  const [showKeywords, setShowKeywords] = useState(false); // State to show/hide selected keywords

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
    // Shuffle the questionsData array and take the first 3 questions
    const shuffledQuestions = shuffleArray(questionsData).slice(0, 3);
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswerSelection = (questionId, answer) => {
    if (answer === 'Other') {
      setShowOtherInput(true); // Show the "Other" input field when "Other" is selected
    } else {
      setShowOtherInput(false); // Hide the "Other" input field for other answers
    }
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const handleOtherInputChange = (event) => {
    setSelectedAnswers({ ...selectedAnswers, [questions[currentIndex].id]: event.target.value });
  };

  const handleNextQuestion = () => {
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
      setShowOtherInput(false); // Hide the "Other" input field when moving to the next question
    } else {
      // Handle completion or navigation to the next screen
      console.log('Selected Answers:', selectedAnswers);
      // You can navigate to the next screen or perform any action here
      setShowKeywords(true); // Show the selected keywords section
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
      {showKeywords && (
        <div className="selected-keywords">
          <h2>Selected Keywords</h2>
          <p>Keyword 1: {selectedAnswers[questions[0].id]}</p>
          <p>Keyword 2: {selectedAnswers[questions[1].id]}</p>
          <p>Keyword 3: {selectedAnswers[questions[2].id]}</p>
          {/* You can customize the display as needed */}
        </div>
      )}
    </div>
  );
}

export default Queries;
