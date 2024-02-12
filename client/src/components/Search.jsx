import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "./Questions/Questions";
import Navbar from "./Navbar"; // Adjust the path as necessary

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
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
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
    setCurrentIndex(0);
    setShowOtherInput(false);
    setQuestions(shuffleArray(questionsData).slice(0, 3));
    setSelectedAnswers({});
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div>
      {/* Main Content */}
      <div
        className="relative flex flex-col items-center justify-center py-6 px-4 bg-blue-100 rounded-lg shadow-lg"
        style={{ margin: "auto", minWidth: "80%", maxHeight: "600px" }}
      >
        {/* Navbar */}
        <Navbar />
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-800 mb-0">
          Answer for Me These Questions Three!
        </h1>
        {/* Question Container */}
        <h2
          className="text-2xl font-bold text-blue-800 mb-4"
          style={{
            textShadow: "0 0 5px black",
            color: "#F7D56A",
            marginBottom: "5px",
            marginTop: "35px",
          }}
        >
          Question {currentIndex + 1}
        </h2>
        {currentQuestion && (
          <>
            <p className="text-xl font-semibold text-purple-600 mb-4">
              {currentQuestion.question}
            </p>
            <div
              className={`bg-white p-6 rounded-lg shadow-md max-w-md mx-auto ${
                currentQuestion.answers.length <= 3
                  ? "flex justify-center items-center"
                  : ""
              }`}
              style={{
                overflowY: "auto",
                minWidth: "300px",
                minHeight: "200px", // Adjust the minimum height here
                maxWidth: "80%",
                maxHeight: "80%",
              }}
            >
              <div
                className={`${
                  currentQuestion.answers.length >= 4
                    ? "grid grid-cols-2 gap-4"
                    : "flex flex-col items-center"
                } w-full`}
              >
                {currentQuestion.answers.map((answer, index) => (
                  <div
                    key={index}
                    className={`p-2 my-2 cursor-pointer ${
                      selectedAnswers[currentQuestion.id] === answer.keyword
                        ? "text-pink-500 text-lg transform hover:scale-110"
                        : "text-gray-600 transform hover:scale-110"
                    }`}
                    onClick={() =>
                      selectAnswer(currentQuestion.id, answer.keyword)
                    }
                    style={{
                      transition: "transform 0.3s", // Added transition for transform
                    }}
                  >
                    <span
                      style={{
                        borderRadius: "20px",
                        lineHeight: "1.5",
                        marginTop: "5px",
                        letterSpacing: "2px",
                      }}
                    >
                      {answer.displayText}
                    </span>
                  </div>
                ))}
                {showOtherInput && (
                  <input
                    type="text"
                    placeholder="Enter one keyword"
                    value={selectedAnswers[currentQuestion.id] || ""}
                    onChange={handleOtherInputChange}
                    className="mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full transform hover:scale-110"
                  />
                )}
              </div>
            </div>
          </>
        )}
        {/* Action Buttons */}
        <div className="flex justify-center mt-4">
          <button
            onClick={swapQuestion}
            className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 mr-3 transform hover:scale-110"
            style={{
              marginTop: "10px", // Adjust the marginTop as needed
            }}
          >
            <span>Swap Question</span>
          </button>
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-110"
            style={{
              marginTop: "10px", // Adjust the marginTop as needed
            }}
          >
            <span>Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
