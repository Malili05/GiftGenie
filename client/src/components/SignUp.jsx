import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { loading, error }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formState.username || !formState.email || !formState.password) {
        throw new Error("All fields are required.");
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
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 px-40">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Make an account!</h1>
      <form className="w-full max-w-xs" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-blue-800 text-sm font-bold mb-2" htmlFor="username">
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
        <div className="mb-4">
          <label className="block text-blue-800 text-sm font-bold mb-2" htmlFor="email">
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
            <p className="text-red-500 text-sm">Email is already registered.</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-blue-800 text-sm font-bold mb-2" htmlFor="password">
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
            <p className="text-red-500 text-sm">Password must be at least 6 characters long.</p>
          )}
        </div>
        {error && !error.message.includes("duplicate key error") && (
          <p className="text-red-500 text-sm mb-4">Error occurred during sign-up. Please try again.</p>
        )}
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/Login")}
          className="text-blue-800 hover:text-blue-600 underline pl-2"
        >
          Log in
        </button>
      </p>
      <p className="mt-4">
        Want a gift without an account?{" "}
        <button
          onClick={() => navigate("/")}
          className="text-blue-800 hover:text-blue-600 underline pl-2"
        >
          Check it out!
        </button>
      </p>
    </div>
  );
};

export default Signup;
