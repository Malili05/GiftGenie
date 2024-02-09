const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    gifts: [Gift]
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
    addUser(
      name: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      name: String
      email: String
      password: String
    ): User
    login(
      email: String!
      password: String!
    ): Auth
  }
`;

module.exports = typeDefs;

