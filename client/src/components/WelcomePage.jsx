import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import lampImage from "/Lamp.webp";
import AuthService from "../utils/auth";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [marginTop, setMarginTop] = useState("5rem");
  const [marginBottom, setMarginBottom] = useState("5rem");
  const [promptMessage, setPromptMessage] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);

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

    const prompts = [
      "Click the lamp",
      "You know you want to",
      "Come on, Do it!",
      "Just click it!",
      "No Gift For You!",
      "Get to the choppa!"
    ];

    const promptInterval = setInterval(() => {
      setPromptMessage(prompts[promptIndex]);
      setShowPrompt(true);
      setPromptIndex((prevIndex) => (prevIndex + 1) % prompts.length);
    }, 10000); // Change prompt every 15 seconds

    return () => {
      clearInterval(promptInterval);
      window.removeEventListener("resize", handleResize);
    };
  }, [promptIndex]);

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div
        className="main-container bg-blue-100 rounded-lg shadow-lg p-6"
        style={{ marginTop, marginBottom }}
      >
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">Welcome To</h2>
          <h1 className="text-6xl font-bold text-yellow-400 mb-4 text-shadow-black">
            Gift Genie
          </h1>
        </header>
        <div className="text-center mb-8">
          <p className="text-lg text-gray-800 mb-4">
            Click on the lamp to begin the search for the perfect gift.
          </p>
          
        </div>
        <div className="flex justify-center mb-8">
          <div className="relative animate-bounce mb-8">
            <img
              src={lampImage}
              alt="Genie Lamp"
              title="Rub Me"
              className="max-w-xs w-full h-auto mb-4 cursor-pointer"
              onClick={() => goTo("/Search")}
            />
          </div>
        </div>
        {showPrompt && (
            <p className="text-lg text-red-600 animate-bounce">
              {promptMessage}
            </p>
          )}
        <div className="text-center mt-4">
          {AuthService.loggedIn() ? (
            <>
              <button
                onClick={() => goTo("/Profile")}
                className="text-3xl text-blue-600 hover:text-blue-800 transform hover:scale-105 transition-transform bg-transparent"
              >
                Visit Your Profile
              </button>
              <p className="text-lg text-gray-800 mt-6">
                Check your saved gifts.
              </p>
            </>
          ) : (
            <>
              <button
                onClick={() => goTo("/Login")}
                className="text-3xl text-blue-500 hover:text-blue-800 transform hover:scale-105 transition-transform bg-transparent"
              >
                Log In
              </button>
              <p className="text-lg text-gray-800 mt-6">
                Log in to save gifts.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
