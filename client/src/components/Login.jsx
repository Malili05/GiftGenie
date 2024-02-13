
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import Navbar from './Navbar'; 

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { loading, error }] = useMutation(LOGIN);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCreateAccountClick = () => {
    navigate('/SignUp');
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
      navigate('/Profile');
    } catch (e) {
      console.error('Login error:', e);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="relative">    
        <div className="bg-blue-100 py-8 px-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <Navbar showLoginButton={false} />
          <h1 className="text-4xl font-bold text-blue-800 mb-8">Log in</h1>
          <div className="mb-4 w-full max-w-xs">
            <label className="block text-blue-800 text-lg font-bold mb-2" htmlFor="email">
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
          <div className="mb-6 w-full max-w-xs">
            <label className="block text-blue-800 text-lg font-bold mb-2" htmlFor="password">
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

          {error && <p className="text-red-500 text-sm mb-4">Invalid email or password.</p>}
          <button
            className="text-green-800 hover:text-yellow-500 font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline transition duration-200 text-3xl" 
            type="button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Submit'}
          </button>
          <div className="mt-4">
            <button
              className="text-blue-800 hover:text-yellow-500 font-bold pl-2"
              onClick={handleCreateAccountClick}
            >
              Make an Account
            </button>
          </div>
          <p className="mt-4">
            Want to try it before you make an account?
            <button
              onClick={() => navigate('/')}
              className="text-blue-800 hover:text-yellow-500 font-bold pl-2"
            >
              Back to home
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
