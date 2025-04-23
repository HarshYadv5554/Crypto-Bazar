import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user'); // Remove invalid data
      }
    }
  }, []);

  const toggleForm = () => setIsOpen(!isOpen);
  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const url = isLogin
      ? 'https://crypto-bazar-one.vercel.app/user/login'
      : 'https://crypto-bazar-one.vercel.app/user/signup';

    try {
      const requestBody = isLogin
        ? { email, password }
        : { username, email, password };

      const response = await axios.post(url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true,
        },
      });

      console.log('Success:', response.data);
      setUser(response.data.user.username);
      localStorage.setItem('user', JSON.stringify(response.data.user.username));
      localStorage.setItem('token', response.data.token);;
      setIsOpen(false);
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || 'An error occurred'
      );
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('https://crypto-bazar-pxgn.vercel.app/user/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative top-0 right-0 m-4 z-50">
      {user ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
          >
            {user}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-xl">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-green-700 hover:text-black"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <button
            onClick={toggleForm}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
          >
            {isOpen ? 'Close' : 'Login'}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-black text-green-400 rounded-lg shadow-xl p-4">
              <h2 className="text-lg font-semibold mb-4 text-green-400">
                {isLogin ? 'Login' : 'Sign Up'}
              </h2>
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 mb-3 text-sm border border-green-600 rounded bg-black text-green-400 placeholder-green-600"
                    required
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 mb-3 text-sm border border-green-600 rounded bg-black text-green-400 placeholder-green-600"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 mb-3 text-sm border border-green-600 rounded bg-black text-green-400 placeholder-green-600"
                  required
                />
                {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
                >
                  {isLogin ? 'Login' : 'Sign Up'}
                </button>
              </form>
              <p className="mt-4 text-sm text-center text-green-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={switchMode} className="text-green-400 hover:underline">
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AuthForm;
