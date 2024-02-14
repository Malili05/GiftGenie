import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_GIFTS_QUERY } from "../utils/queries";
import { SAVE_GIFT } from "../utils/mutations";
import AuthService from "../utils/auth";

const GiftDisplay = () => {
  const { loading, error, data } = useQuery(GET_GIFTS_QUERY);
  const [displayedGift, setDisplayedGift] = useState(null);
  const [giftSaved, setGiftSaved] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const isLoggedIn = AuthService.loggedIn();

  useEffect(() => {
    if (!loading && !error && data && data.gifts.length > 0) {
      const randomGift =
        data.gifts[Math.floor(Math.random() * data.gifts.length)];
      setDisplayedGift(randomGift);
    }
  }, [loading, error, data]);

  const [saveGift] = useMutation(SAVE_GIFT);

  const handleSaveAndNotify = async () => {
    try {
      if (displayedGift) {
        await saveGift({ variables: { giftId: displayedGift._id } });
        setGiftSaved(true);
      }
    } catch (error) {
      console.error("Error saving gift:", error);
    }
  };

  const handleBuyThis = () => {
    if (displayedGift && displayedGift.buyUrl) {
      window.open(displayedGift.buyUrl, "_blank");
    }
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="gift-display my-8 max-w-md flex flex-col items-center">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {displayedGift && (
        <>
          <h2
            className="font-semibold text-xl text-yellow-400 mb-4"
            style={{
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
          >
            {displayedGift.name}
          </h2>
          <div className="image-container w-full h-60 mb-4 flex items-center justify-center">
            <img
              src={displayedGift.image}
              alt={displayedGift.name}
              className="max-w-full max-h-60 h-auto object-contain"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </div>
          <div className="text-container">
            <p className="text-sm mb-2">
              <span
                className="text-blue-500 cursor-pointer"
                onMouseEnter={toggleDescription}
                onMouseLeave={toggleDescription}
              >
                Description
              </span>
              {showDescription && (
                <span className="description-popup">
                  {displayedGift.description}
                </span>
              )}
            </p>
            <p className="text-base font-semibold mb-2">
              Price: ${displayedGift.price}
            </p>
          </div>
          <div className="button-container flex justify-center w-full">
  {isLoggedIn && (
    <button
      onClick={handleSaveAndNotify}
      className="mr-10 text-xl text-purple-600 hover:text-yellow-500 transform hover:scale-110 cursor-pointer"
    >
      Save Gift
    </button>
  )}
  <button
    onClick={handleBuyThis}
    className=" text-xl text-green-600 hover:text-yellow-500 transform hover:scale-110 cursor-pointer"
  >
    Buy This
  </button>
</div>
          {giftSaved && (
            <p className="text-center mt-4 text-green-600">
              Your gift has been saved!
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default GiftDisplay;
