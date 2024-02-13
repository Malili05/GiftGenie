import { useNavigate } from "react-router-dom";
import lampImage from "/Lamp.webp";
import AuthService from "../utils/auth";

const WelcomePage = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <div
        className="relative flex flex-col items-center justify-center py-6 px-4 bg-blue-100 rounded-lg shadow-lg"
        style={{ margin: "auto", minWidth: "80%", maxHeight: "800px" }}
      >
        <header className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">Welcome To</h2>
          <h1
            className="text-6xl font-bold text-blue-800 mb-4"
            style={{
              textShadow: "0 0 10px black",
              color: "#F7D56A",
              marginBottom: "5px",
              marginTop: "20px",
            }}
          >
            Gift Genie
          </h1>
        </header>
        <div className="text-center mb-8">
          <p className="text-lg text-gray-800 mb-4">
            Click on the lamp to begin the search for the perfect gift.
          </p>
        </div>
        <div
          className="relative animate-bounce"
          style={{ animationDuration: "2s" }}
        >
          <img
            src={lampImage}
            alt="Genie Lamp"
            title="Rub Me"
            className="max-w-xs w-full h-auto mb-4 cursor-pointer"
            onClick={() => goTo("/Search")}
            style={{ cursor: "pointer" }}
          />
        </div>
        {AuthService.loggedIn() ? (
          <div className="text-center mt-4">
            <button
              onClick={() => goTo("/Profile")}
              className="px-6 py-2 text-blue-800 font-bold rounded-full hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-200 transform hover:scale-105 text-3xl"
              style={{ marginTop: "5px", letterSpacing: "1px" }}
            >
              PROFILE
            </button>
            <p className="text-lg text-gray-600 mt-6">Check your saved gifts.</p>
          </div>
        ) : (
          <div className="text-center mt-4">
            <button
              onClick={() => goTo("/Login")}
              className="px-6 py-2 text-blue-800 font-bold rounded-full hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-200 transform hover:scale-105 text-3xl"
              style={{ marginTop: "5px", letterSpacing: "2px" }}
            >
              <span style={{ position: "relative", top: "5px" }}>LOG IN</span>
            </button>
            <p className="text-lg text-gray-600 mt-6">Log in to save gifts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
