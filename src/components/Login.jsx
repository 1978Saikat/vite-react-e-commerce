import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users data
    axios.get('./users.json')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setMessage("Login successful!");
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      window.dispatchEvent(new Event("user-login"));
      // Navigate to home page
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        
        <form 
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {message && (
            <div className={`text-center ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </div>
          )}

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
            
            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link 
                to="/register" 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Register now
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

