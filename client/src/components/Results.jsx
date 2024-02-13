import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import GiftDisplay from "./GiftDisplay";

const Results = () => {
  const navigate = useNavigate();

  const handleStartOver = () => {
    navigate("/search");
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="main-container bg-blue-100 rounded-lg shadow-lg p-6">
        <Navbar />
        <h1 className="text-4xl font-bold text-blue-800 mb-0">
          Is This The Perfect Gift
          <span
            className="text-blue-400 cursor-pointer inline-block transform hover:text-yellow-400 hover:scale-110 transition duration-300"
            onClick={refreshPage}
            style={{ marginLeft: "0.5rem" }}
          >
            ?
          </span>
        </h1>
        <GiftDisplay />

        <div
          onClick={handleStartOver}
          className="px-4 py-2 text-purple-500 font-semibold rounded-lg cursor-pointer hover:text-yellow-400 transition duration-300 transform hover:scale-110 mt-4 text-2xl"
        >
          <span>Start Over</span>
        </div>
      </div>
    </div>
  );
};

export default Results;
