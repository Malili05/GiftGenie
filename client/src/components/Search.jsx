import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "./Questions/Questions";
import AuthService from '../utils/auth'; 

function Search() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOtherInput, setShowOtherInput] = useState(false);

  const navigate = useNavigate();

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

  const selectAnswer = (questionId, keyword) => {
    const isOtherSelected = keyword === "User-Defined";
    setShowOtherInput(isOtherSelected);
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: isOtherSelected ? "" : keyword,
    });
  };

  const handleOtherInputChange = (event) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questions[currentIndex].id]: event.target.value,
    });
  };

  const handleNextQuestion = () => {
    if (!selectedAnswers[questions[currentIndex].id]) {
      alert("Please select an answer before proceeding.");
      return;
    }

    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
      setShowOtherInput(false);
    } else {
      console.log("Selected Answers:", selectedAnswers);
      navigate("/results", { state: { selectedAnswers } });
    }
  };

  const swapQuestion = () => {
    const remainingQuestions = questionsData.filter(
      (q) => !questions.some((presentQ) => presentQ.id === q.id)
    );
    const newQuestion = shuffleArray(remainingQuestions).slice(0, 1)[0];
    if (newQuestion) {
      const updatedQuestions = [...questions];
      updatedQuestions[currentIndex] = newQuestion;
      setQuestions(updatedQuestions);
    }
  };

  const startOver = () => {
    navigate("/"); 
  };

  const goToProfile = () => {
    navigate('/Profile');
  };

  const goToLogin = () => {
    navigate('/Login');
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="search-container flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold mb-4 text-yellow-400">
        Answer for Me These Questions Three!
      </h1>
      {currentQuestion && (
        <div className="question-box bg-gray-100 p-5 rounded-lg shadow-md w-full max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-blue-500">
            Question {currentIndex + 1}
          </h2>
          <p className="mb-3 text-gray-700">{currentQuestion.question}</p>
          <div>
            {currentQuestion.answers.map((answer, index) => (
              <div
                key={index}
                className={`p-2 my-2 cursor-pointer hover:bg-yellow-200 ${
                  selectedAnswers[currentQuestion.id] === answer.keyword
                    ? "text-pink-500 text-lg"
                    : "text-gray-600"
                }`}
                onClick={() => selectAnswer(currentQuestion.id, answer.keyword)}
              >
                {answer.displayText}
              </div>
            ))}
            {showOtherInput && (
              <input
                type="text"
                placeholder="Enter one keyword"
                value={selectedAnswers[currentQuestion.id] || ""}
                onChange={handleOtherInputChange}
                className="mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
              />
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={startOver}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 mr-3"
            >
              Start Over
            </button>
            <button
              onClick={swapQuestion}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 mr-3"
            >
              Swap Question
            </button>
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {AuthService.loggedIn() ? (
        <button
          onClick={goToProfile}
          className="mt-4 px-6 py-2 bg-blue-900 text-white font-bold rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-opacity-50"
        >
          Profile
        </button>
      ) : (
        <button
          onClick={goToLogin}
          className="mt-4 px-6 py-2 bg-blue-900 text-white font-bold rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-opacity-50"
        >
          Login
        </button>
      )}
    </div>
  );
}

export default Search;
