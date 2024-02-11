const { User, Gift } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
      return await User.findById(context.user._id).populate({
        path: 'savedGifts.gift',
        model: 'Gift'
      });
    },
    gifts: async (_, { keywords }) => {
      const query = {};
      if (keywords && keywords.length > 0) {
        query.keywords = { $in: keywords };
      }
      return await Gift.find(query);
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
      return await User.findByIdAndUpdate(context.user._id, args, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    saveGift: async (parent, { giftId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }

      const user = await User.findById(context.user._id);

      const isGiftSaved = user.savedGifts.some(savedGift => savedGift.gift.toString() === giftId);

      if (!isGiftSaved) {
        const savedGift = {
          gift: giftId,
          priority: false
        };
        user.savedGifts.push(savedGift);
        await user.save();
        return { saved: true, message: "Gift saved successfully." };
      } else {
        // Gift already saved, return a message indicating so
        return { saved: false, message: "Gift has already been saved." };
      }
    },
    deleteGift: async (parent, { giftId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
      const user = await User.findById(context.user._id);
      
      user.savedGifts = user.savedGifts.filter(savedGift => savedGift.gift.toString() !== giftId);
    
      await user.save();
      return user;
    },
  }
};

module.exports = resolvers;
