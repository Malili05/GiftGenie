

import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';
import './App.css'; // Import the global CSS

// Configure Apollo Client
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

const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        savedGifts: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache, 
});

function App() {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <div className="app-container">
           <video autoPlay loop muted className="background-video">
            <source src="/VideoBackground.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Child routes will be rendered here */}
          <Outlet />
        </div>
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
