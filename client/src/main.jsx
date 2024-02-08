import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import WelcomePage from './components/WelcomePage';
import Login from './components//Login/Login';
import Search from './components/Search/Search';
import Signup from './components/SignUp';
import Results from './components/Results/Results';
import Profile from './components/Profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <WelcomePage />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/Profile',
        element: <Profile />
      }, {
        path: 'Results',
        element: <Results />
      }, {
        path: '/products/:id',
        element: <Search />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router={router} />
)
