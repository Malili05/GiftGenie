const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedGifts: [SavedGift]
  }

  type Gift {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    buyUrl: String
    keywords: [String]
  }

  type SavedGift {
    _id: ID
    gift: Gift
    priority: Boolean
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    gift(_id: ID!): Gift
    gifts(keywords: [String]): [Gift]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    saveGift(giftId: ID!): User
    deleteGift(giftId: ID!): User
  }
`;

module.exports = typeDefs;
