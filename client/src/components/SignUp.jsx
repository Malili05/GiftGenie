import React, { useState } from "react";
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
      if (formState.password !== value) {
        setPasswordsMatch(false);
      } else {
        setPasswordsMatch(true);
      }
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

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="bg-blue-100 py-8 px-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <Navbar showLoginButton={false} />
          <h1 className="text-4xl font-bold text-blue-800 mb-6">
            Make an account!
          </h1>
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                className="block text-blue-800 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
                  !formState.username && error ? "border-red-500" : ""
                }`}
                id="username"
                type="text"
                placeholder="Your Name"
                name="username"
                onChange={handleChange}
              />
              {error && !formState.username && (
                <p className="text-red-500 text-sm">Username is required.</p>
              )}
            </div>
            <div className="mb-2">
              <label
                className="block text-blue-800 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
                  !formState.email && error ? "border-red-500" : ""
                }`}
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              {error && !formState.email && (
                <p className="text-red-500 text-sm">Email is required.</p>
              )}
              {error && error.message.includes("duplicate key error") && (
                <p className="text-red-500 text-sm">
                  Email is already registered.
                </p>
              )}
            </div>
            <div className="mb-0">
              <label
                className="block text-blue-800 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none ${
                  !formState.password && error ? "border-red-500" : ""
                }`}
                id="password"
                type="password"
                placeholder="******************"
                name="password"
                onChange={handleChange}
              />
              {error && !formState.password && (
                <p className="text-red-500 text-sm">Password is required.</p>
              )}
              {error && error.message.includes("password") && (
                <p className="text-red-500 text-sm">
                  Password must be at least 6 characters long.
                </p>
              )}
            </div>
            <div className="mb-2">
              <label
                className="block text-blue-800 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none ${
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
                <p className="text-red-500 text-sm">Passwords do not match.</p>
              )}
              {error && !formState.confirmPassword && (
                <p className="text-red-500 text-sm">
                  Please confirm your password.
                </p>
              )}
              {error && error.message.includes("password") && (
                <p className="text-red-500 text-sm">Passwords must match.</p>
              )}
            </div>
            {error && !error.message.includes("duplicate key error") && (
              <p className="text-red-500 text-sm mb-4">
                Error occurred during sign-up. Please try again.
              </p>
            )}
            <div className="flex items-center justify-center">
              <button
                className="text-purple-800 hover:text-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 transform hover:scale-110 text-3xl"
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
              className="text-blue-800 hover:text-yellow-500 pl-2"
            >
              Log in
            </button>
          </p>
          <p className="mt-4">
            Want a gift without an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-blue-800 hover:text-yellow-500 pl-2"
            >
              Check it out!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
