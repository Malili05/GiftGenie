import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

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
      navigate("/profile");
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 px-40">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="mb-8 text-3xl text-center text-blue-800 font-bold">
          Log in
        </h1>
        <div className="mb-4">
          <label
            className="block text-blue-800 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            name="email"
            placeholder="blank@blank"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-blue-800 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="******************"
            onChange={handleChange}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-4">Invalid email or password.</p>
        )}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
            disabled={loading} // Disable button during login process
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="flex items-center justify-between mx-4">
            <button
              className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleCreateAccountClick}
            >
              Make an Account
            </button>
          </div>
        </div>
      </div>
      <p className="mt-4">
        Want to try it before you make an account?
        <button
          onClick={() => navigate("/")}
          className="text-blue-800 hover:text-blue-600 underline pl-2"
        >
          Back to home
        </button>
      </p>
    </div>
  );
};

export default Login;
