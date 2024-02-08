const mongoose = require("mongoose");

const { Schema } = mongoose;

const giftSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  buyUrl: {
    type: String,
  },
  keywords: {
    type: [String], //Array of strings fo storing multiple keywords
  },
});

const Gift = mongoose.model("Gift", giftSchema);

module.exports = Gift;


