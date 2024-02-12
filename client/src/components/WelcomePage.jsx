import { useState } from "react";
import { useNavigate } from "react-router-dom";
import lampImage from "/Lamp.webp";
import AuthService from "../utils/auth";

const WelcomePage = () => {
  const navigate = useNavigate();

  const goToQuestion = () => {
    navigate("/Search");
  };

  const goToProfile = () => {
    navigate("/Profile");
  };

  const goToLogin = () => {
    navigate("/Login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div
          className="bg-blue-100 py-8 px-4 rounded-lg shadow-lg flex flex-col items-center justify-center"
          style={{
            fontFamily: "Lakki Reddy, sans-serif",
            borderColor: "#F7F56A",
          }}
        >
          <header className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">
              Welcome To
            </h2>
            <h1 className="text-6xl font-bold text-blue-800 mb-4" style={{ textShadow: "0 0 5px black", color: "#F7D56A", marginBottom: "5px", marginTop: "35px" }}>
              Gift Genie
            </h1>
          </header>
          <div className="text-center mb-8">
            <p className="text-lg text-gray-800 mb-4">
              Click on the lamp to begin
              <br />
              the search for the perfect gift.
            </p>
          </div>
          <div className="relative animate-bounce" style={{ animationDuration: "2s" }}>
            <img
              src={lampImage}
              alt="Genie Lamp"
              title="Rub Me"
              className="max-w-xs w-full h-auto mb-4 cursor-pointer"
              onClick={goToQuestion}
              style={{
                cursor: "pointer",
              }}
            />
          </div>
          {AuthService.loggedIn() ? (
            <div className="text-center mt-4">
              <button
                onClick={goToProfile}
                className="px-6 py-2 bg-blue-800 text-white font-bold rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  borderRadius: "20px",
                  lineHeight: "1.5",
                  marginTop: "5px",
                }}
              >
                Profile
              </button>
              <p className="text-lg text-gray-600 mt-6">
                Check your saved gifts
              </p>
            </div>
          ) : (
            <div className="text-center mt-4">
              <button
                onClick={goToLogin}
                className="px-6 py-2 bg-blue-900 text-white font-bold rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  borderRadius: "20px",
                  lineHeight: "1.5",
                  marginTop: "5px",
                }}
              >
                Login
              </button>
              <p className="text-lg text-gray-600 mt-6">
                By logging <br /> in you can save gifts to your profile.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
