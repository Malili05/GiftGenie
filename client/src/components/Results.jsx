import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import GiftDisplay from "./GiftDisplay";
import { useEffect, useState } from "react";

const Results = () => {
  const navigate = useNavigate();

  const handleStartOver = () => {
    navigate("/search");
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const [marginTop, setMarginTop] = useState("5rem");
  const [marginBottom, setMarginBottom] = useState("5rem");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setMarginTop("0");
        setMarginBottom("0");
      } else {
        setMarginTop("5rem");
        setMarginBottom("5rem");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div
        className="main-container bg-blue-100 rounded-lg shadow-lg p-6"
        style={{ marginTop, marginBottom }}
      >
        <Navbar />
        <h1 className="text-4xl font-bold text-blue-800 mb-0">
          Is This The Perfect Gift...
          <span
            className="refresh-icon text-blue-400 cursor-pointer inline-block transform hover:text-yellow-400 hover:scale-110 transition duration-300"
            onClick={refreshPage}
          >
            ?
          </span>
        </h1>
        <GiftDisplay />
        <div className="flex justify-center mt-4">
          <div
            onClick={handleStartOver}
            className="action-btn text-xl text-red-600 hover:text-yellow-500 transform hover:scale-110 cursor-pointer"
          >
            Start Over
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
