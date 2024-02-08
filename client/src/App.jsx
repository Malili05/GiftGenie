import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import WelcomePage from './components/WelcomePage';
import Login from './components//Login/Login';
import Search from './components/Search/Search';
import Signup from './components/SignUp';
import Results from './components/Results/Results';
import Profile from './components/Profile/Profile';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Results' element={<Results />} />
        <Route path='/Profile' element={<Profile />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
    </ApolloProvider>
  );
};

export default App;
