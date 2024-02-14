import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../utils/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goToProfile = () => {
    navigate("/Profile");
  };

  const goToLogin = () => {
    navigate("/Login");
  };

  const goToHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };

  const goToSearch = () => {
    navigate("/Search");
  };

  const isSearchPage = () => {
    return location.pathname === "/Search";
  };

  const isLoginPage = () => {
    return location.pathname === "/Login";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden sticky top-0 z-50 bg-transparent">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-4xl font-bold cursor-pointer text-yellow-400" onClick={goToHome}>Gift Genie</h1>
          <div className="text-3xl cursor-pointer" onClick={toggleMenu}>☰</div>
        </div>

        {isMenuOpen && (
          <div className="flex flex-col items-start bg-purple-100 p-4">
            {!isSearchPage() && <button className="py-2 text-left" onClick={goToSearch}>Search</button>}
            {AuthService.loggedIn() && <button className="py-2 text-left" onClick={goToProfile}>Profile</button>}
            {!AuthService.loggedIn() &&<button className="py-2 text-left" onClick={goToLogin}>Log In</button>}
            {AuthService.loggedIn() && <button className="py-2 text-left" onClick={handleLogout}>Log Out</button>}
          </div>
        )}
      </div>

      {/* Default Navbar for Desktop */}
      <div className={`hidden md:flex justify-between items-center w-full mt-0 mb-10 sticky top-0 z-50 bg-transparent`}>
        <h1
          className="cursor-pointer text-4xl text-yellow-400 font-bold transition duration-300 ease-in-out hover:text-red-500 hover:transform hover:scale-125"
          onClick={goToHome}
        >
          Gift Genie
        </h1>
        <div>
          {!isSearchPage() && (
            <button onClick={goToSearch} className="text-xl text-blue-600 hover:text-purple-800 transform hover:scale-110 transition-transform bg-transparent mr-4">
              Search
            </button>
          )}
          {AuthService.loggedIn() && (
            <button onClick={goToProfile} className="text-xl text-blue-600 hover:text-purple-800 transform hover:scale-110 transition-transform bg-transparent mr-4">
              PROFILE
            </button>
          )}
          {!AuthService.loggedIn() && !isLoginPage() && (
            <button onClick={goToLogin} className="text-xl text-blue-600 hover:text-purple-800 transform hover:scale-110 transition-transform bg-transparent mr-4">
              LOG IN
            </button>
          )}
          {AuthService.loggedIn() && (
            <button onClick={handleLogout} className="text-xl text-blue-600 hover:text-purple-800 transform hover:scale-110 transition-transform bg-transparent mr-4">
              LOG OUT
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
