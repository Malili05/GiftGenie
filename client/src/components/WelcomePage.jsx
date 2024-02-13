import { useNavigate } from "react-router-dom";
import lampImage from "/Lamp.webp"; // Assuming Lamp.webp is in the same directory
import AuthService from "../utils/auth";
import { useEffect, useState } from "react";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [marginTop, setMarginTop] = useState("5rem");
  const [marginBottom, setMarginBottom] = useState("5rem"); // New state for bottom margin

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setMarginTop("0");
        setMarginBottom("0"); // Remove bottom margin for small screens
      } else {
        setMarginTop("5rem");
        setMarginBottom("5rem"); // Add bottom margin for larger screens
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          <h1 className="text-6xl font-bold text-blue-800 mb-4 text-shadow-yellow">
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
        <div className="text-center mt-4">
          {AuthService.loggedIn() ? (
            <>
              <button onClick={() => goTo("/Profile")} className="btn-profile">
                PROFILE
              </button>
              <p className="text-lg text-gray-600 mt-6">
                Check your saved gifts.
              </p>
            </>
          ) : (
            <>
              <button onClick={() => goTo("/Login")} className="btn-login">
                LOG IN
              </button>
              <p className="text-lg text-gray-600 mt-6">
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
