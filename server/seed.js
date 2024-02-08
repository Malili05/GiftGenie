const mongoose = require("mongoose");
const connectDB = require("./config/connection"); // Adjust the path as necessary
const Gift = require("./models/Gift"); // Adjust the path as necessary
const initialGifts = require("./models/giftData"); // Adjust the path to your initialGifts data

connectDB();

const seedDatabase = async () => {
  try {
    await Gift.deleteMany({});
    await Gift.insertMany(initialGifts);
    console.log("Database seeded successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("Failed to seed database:", error);
    process.exit(1);
  }
};

seedDatabase();
