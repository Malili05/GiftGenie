const { User, Gift } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        // Fetch the user by ID and populate the gifts
        const user = await User.findById(context.user._id).populate("savedGifts");
        return user;
      }
      // If the user is not logged in, throw an authentication error
      throw new AuthenticationError("Not logged in");
    },
    gifts: async (_, { keywords }) => {
      // Build a query object based on the provided keywords
      let query = {};
      if (keywords && keywords.length > 0) {
        query.keywords = { $in: keywords };
      }
      // Return the list of gifts matching the query
      return await Gift.find(query);
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      // Create a new user with the provided details
      const user = await User.create(args);
      // Sign a token for the newly created user
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        // Update the user's details if they are logged in
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }
      // Throw an authentication error if the user is not logged in
      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      // Find a user by their email
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      // Sign a token for the logged-in user
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
