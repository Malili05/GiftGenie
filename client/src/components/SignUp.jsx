import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import Navbar from "./Navbar";

const Signup = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [addUser, { loading, error }] = useMutation(ADD_USER);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    if (name === "confirmPassword") {
      setPasswordsMatch(formState.password === value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formState.username ||
        !formState.email ||
        !formState.password ||
        !formState.confirmPassword
      ) {
        throw new Error("All fields are required.");
      }

      if (formState.password !== formState.confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const mutationResponse = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
      navigate("/profile");
    } catch (e) {
      console.error("Signup error:", e.message);
    }
  };

  const [marginTop, setMarginTop] = useState("5rem");
  const [marginBottom, setMarginBottom] = useState("5rem");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setMarginTop("0");
        setMarginBottom("0");
      } else {
        setMarginTop("5rem");
        setMarginBottom("5rem");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div
        className={`main-container bg-blue-100 rounded-lg shadow-lg p-6 ${
          window.innerWidth <= 768 ? "w-full" : "max-w-md"
        }`}
        style={{ marginTop, marginBottom }}
      >
        <Navbar showLoginButton={false} />
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Make an account!
        </h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label" htmlFor="username">
              Name
            </label>
            <br />
            <input
              className={`form-input text-center ${
                !formState.username && error ? "border-red-500" : ""
              }`}
              id="username"
              type="text"
              placeholder="Your Name"
              name="username"
              onChange={handleChange}
            />
            {error && !formState.username && (
              <p className="error-msg">Username is required.</p>
            )}
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <br />
            <input
              className={`form-input text-center ${
                !formState.email && error ? "border-red-500" : ""
              }`}
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            {error && !formState.email && (
              <p className="error-msg">Email is required.</p>
            )}
            {error && error.message.includes("duplicate key error") && (
              <p className="error-msg">Email is already registered.</p>
            )}
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <br />
            <input
              className={`form-input text-center ${
                !formState.password && error ? "border-red-500" : ""
              }`}
              id="password"
              type="password"
              placeholder="******************"
              name="password"
              onChange={handleChange}
            />
            {error && !formState.password && (
              <p className="error-msg">Password is required.</p>
            )}
            {error && error.message.includes("password") && (
              <p className="error-msg">
                Password must be at least 6 characters long.
              </p>
            )}
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <br />
            <input
              className={`form-input text-center ${
                (!formState.confirmPassword || !passwordsMatch) && error
                  ? "border-red-500"
                  : ""
              }`}
              id="confirmPassword"
              type="password"
              placeholder="******************"
              name="confirmPassword"
              onChange={handleChange}
            />
            {!passwordsMatch && (
              <p className="mt-3 error-msg text-red-500">Passwords do not match.</p>
            )}
            {error && !formState.confirmPassword && (
              <p className="error-msg">Please confirm your password.</p>
            )}
            {error && error.message.includes("password") && (
              <p className="error-msg">Passwords must match.</p>
            )}
          </div>
          {error && !error.message.includes("duplicate key error") && (
            <p className="error-msg">
              Error occurred during sign-up. Please try again.
            </p>
          )}
          <div className="flex items-center justify-center">
            <button
              className={`mt-5 text-3xl text-green-500 hover:text-red-400 transform hover:scale-105 transition-transform bg-transparent btn-submit ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Submit"}
            </button>
          </div>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/Login")}
            className="text-lg text-blue-800 hover:text-yellow-500 font-bold pl-2"
          >
            Log in
          </button>
        </p>
        <p className="mt-4">
          Want a gift without an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-lg text-blue-800 hover:text-yellow-500 font-bold pl-2"
          >
            Check it out!
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
