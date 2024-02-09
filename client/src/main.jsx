import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import App from "./App.jsx";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login.jsx";
import Search from "./components/Search.jsx";
import NoMatch from "./components/NoMatch";
import Signup from "./components/SignUp";
import Results from "./components/Results.jsx";
import Profile from "./components/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Signup",
        element: <Signup />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "Results",
        element: <Results />,
      },
      {
        path: "/Search",
        element: <Search />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
