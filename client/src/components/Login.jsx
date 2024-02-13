import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { loading, error }] = useMutation(LOGIN);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCreateAccountClick = () => {
    navigate("/SignUp");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      navigate("/Profile");
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  const [marginTop, setMarginTop] = useState("5rem");
  const [marginBottom, setMarginBottom] = useState("5rem");
  const [marginLeft, setMarginLeft] = useState("auto"); // Initially set to "auto" for mobile
  const [marginRight, setMarginRight] = useState("auto"); // Initially set to "auto" for mobile

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setMarginTop("0");
        setMarginBottom("0");
        setMarginLeft("auto"); // Reset to "auto" for mobile
        setMarginRight("auto"); // Reset to "auto" for mobile
      } else {
        setMarginTop("5rem");
        setMarginBottom("5rem");
        setMarginLeft("0");
        setMarginRight("0");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div
        className="main-container bg-blue-100 rounded-lg shadow-lg p-6"
        style={{ marginTop, marginBottom, marginLeft, marginRight }}
      >
        <Navbar />
        <h1 className="text-4xl font-bold text-blue-800 mb-8">Log in</h1>
        <div className="mb-4">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-input"
            id="email"
            type="text"
            name="email"
            placeholder="blank@blank"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-input"
            id="password"
            type="password"
            name="password"
            placeholder="******************"
            onChange={handleChange}
          />
        </div>
        {error && <p className="error-msg">Invalid email or password.</p>}
        <button
          className="btn-submit"
          type="button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Submit"}
        </button>
        <div className="mt-4">
          <button
            className="btn-create-account"
            onClick={handleCreateAccountClick}
          >
            Make an Account
          </button>
        </div>
        <p className="mt-4">
          Want to try it before you make an account?
          <button
            onClick={() => navigate("/")}
            className="text-blue-800 hover:text-yellow-500 font-bold pl-2"
          >
            Back to home
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
