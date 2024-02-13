import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import AuthService from "../utils/auth";
import { QUERY_USER } from "../utils/queries";
import GiftCard from "./GiftCard";
import Navbar from "./Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const { data, refetch } = useQuery(QUERY_USER);

  const [profileName, setProfileName] = useState("");

  const randomImgUrl = () => {
    const images = [
      "/clippygenie1.webp",
      "/clippygenie2.webp",
      "/clippygenie3.webp",
      "/clippygenie4.webp",
      "/clippygenie5.webp",
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      navigate("/login");
    } else if (data) {
      setProfileName(data.user.username);
      refetch();
    }
  }, [navigate, data, refetch]);

  const logout = () => {
    AuthService.logout();
    navigate("/Login");
  };

  const goToSearchPage = () => navigate("/search");

  const profileImageUrl = randomImgUrl();
  const savedGifts = data?.user?.savedGifts;

  return (
    <div className="main-container flex flex-col items-center justify-center min-h-screen text-center bg-blue-100 rounded-lg shadow-lg p-6">
      {/* Navbar component */}
      <Navbar />
      
      {/* Profile image */}
      <div className="max-w-48 max-h-48 w-full">
        <img
          src={profileImageUrl}
          alt="Profile"
          className="w-full h-auto object-cover rounded-full mx-auto mb-8"
        />
      </div>

      {/* Profile name */}
      <h1 className="text-4xl font-bold text-blue-800 mb-4">
        {profileName}&rsquo;s Profile
      </h1>

      {/* Title for saved gifts */}
      <h2
        className="text-2xl font-bold text-yellow-400 mb-4"
        style={{ WebkitTextStroke: ".1px black" }}
      >
        Saved Gifts
      </h2>
      
      {/* Container for saved gifts */}
      <div className="max-w-screen-md w-full mx-auto border-2 border-gray-800 rounded-lg shadow-lg p-4 overflow-y-auto" style={{ minHeight: "300px", maxHeight: "400px" }}>
        {/* Display saved gifts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {savedGifts && savedGifts.length > 0 ? (
            savedGifts.map((savedGift) => (
              <div key={savedGift._id} className="m-2">
                {/* Gift card component */}
                <GiftCard savedGift={savedGift} />
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-700">
              You don&rsquo;t have any saved gifts yet.
            </p>
          )}
        </div>
      </div>

      {/* Button to search for more gifts */}
      <div
        onClick={goToSearchPage}
        className="px-4 py-2 text-purple-500 font-semibold rounded-lg cursor-pointer hover:text-yellow-400 transition duration-300 transform hover:scale-110 mt-4 text-3xl"
      >
        <span>Search For More Gifts</span>
      </div>

      {/* Logout button */}
      <div
        onClick={logout}
        className="px-4 py-2 text-red-500 font-semibold rounded-lg cursor-pointer hover:text-yellow-400 transition duration-300 transform hover:scale-110 mt-4 text-xl"
      >
        <span>LOGOUT</span>
      </div>
    </div>
  );
};

export default Profile;
