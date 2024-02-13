import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../utils/auth";

const Navbar = () => {
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

  const shouldShowButtons = () => {
    return (
      location.pathname !== "/Login" &&
      location.pathname !== "/SignUp" &&
      location.pathname !== "/Profile"
    );
  };

  return (
    <div className="flex justify-between items-center w-full mt-0 mb-10">
      <h1
        className="cursor-pointer text-3xl text-blue-800 font-bold transition duration-300 ease-in-out hover:text-yellow-500"
        onClick={goToHome}
      >
        Gift Genie
      </h1>
      {AuthService.loggedIn() && shouldShowButtons() && (
        <button onClick={goToProfile} className="button-style">
          PROFILE
        </button>
      )}
      {!AuthService.loggedIn() && shouldShowButtons() && (
        <button onClick={goToLogin} className="button-style">
          LOG IN
        </button>
      )}
      {AuthService.loggedIn() && shouldShowButtons() && (
        <button onClick={handleLogout} className="button-style">
          LOG OUT
        </button>
      )}
    </div>
  );
};

export default Navbar;
