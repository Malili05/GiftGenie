const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');  
const path = require('path');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config();

const { typeDefs, resolvers } = require('./graphql');
const connectDB = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const startApolloServer = async () => {
  await server.start();
  await connectDB(); 

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(cors());  

  
  app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};


startApolloServer();
