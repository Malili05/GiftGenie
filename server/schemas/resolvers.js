const { User, Gift } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    
  },
  Mutation: {
  }
};

module.exports = resolvers;
