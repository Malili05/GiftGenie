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
  const [marginTop, setMarginTop] = useState("5rem");
  const [marginBottom, setMarginBottom] = useState("5rem");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      navigate("/login");
    } else if (data) {
      setProfileName(data.user.username);
      refetch();
    }
  }, [navigate, data, refetch]);

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

  useEffect(() => {
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
    setProfileImageUrl(randomImgUrl());
  }, []);

  const logout = () => {
    AuthService.logout();
    navigate("/Login");
  };

  const goToSearchPage = () => navigate("/search");

  const savedGifts = data?.user?.savedGifts;

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div
        className="main-container bg-blue-100 rounded-lg shadow-lg p-6"
        style={{ marginTop, marginBottom }}
      >
        <Navbar />
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <img
            src={profileImageUrl}
            alt="Profile"
            style={{
              maxWidth: "250px",
              height: "auto",
              borderRadius: "50%",
              marginBottom: "20px",
            }}
          />
        </div>

        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          {profileName}&rsquo;s Profile
        </h1>
        <h2
          className="text-3xl font-bold text-yellow-400 mb-4"
          style={{ WebkitTextStroke: ".5px black" }}
        >
          Explore, Manage, and Favorite Your Saved Gifts
        </h2>
        <div
          onClick={goToSearchPage}
          className="action-btn text-xl text-green-500 hover:text-yellow-500 transform hover:scale-105 cursor-pointer"
        >
          Search For More Gifts
        </div>

        <div
          className="flex justify-center items-center"
          style={{
            minHeight: "100px",
            width: "100%",
            overflowY: "auto",
            maxWidth: "800px",
          }}
        >
          {savedGifts && savedGifts.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              {savedGifts.map((savedGift) => (
                <div
                  key={savedGift._id}
                  className="m-2"
                  style={{ width: "250px" }}
                >
                  <GiftCard savedGift={savedGift} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xl text-purple-500">
              You don&rsquo;t have any saved gifts yet.
            </p>
          )}
        </div>

        <div
          onClick={logout}
          className="mt-5 action-btn text-md text-red-500 transform hover:scale-105 hover:text-yellow-500 cursor-pointer"
        >
          LOGOUT
        </div>
      </div>
    </div>
  );
};

export default Profile;
