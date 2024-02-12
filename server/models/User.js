const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Gift = require("./Gift");

const { Schema } = mongoose;

const savedGiftSchema = new Schema({
  gift: {
    type: Schema.Types.ObjectId,
    ref: "Gift"
  },
  priority: {
    type: Boolean,
    default: false
  }
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  savedGifts: [savedGiftSchema], 
});

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to compare password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
