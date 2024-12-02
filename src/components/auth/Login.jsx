import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // Use navigate hook for programmatic navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // For now, just simulate a successful login and navigate to the home page.
    // You can replace this with your actual login logic (API call, etc.)
    if (email && password) {
      // Save token or session data if needed
      localStorage.setItem("authToken", "alkshjdjriuefnkdj"); // Example token storage

      // Redirect to home page
      navigate("/"); // Navigate to home page
    } else {
      alert("Please fill in both fields");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Hi, Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="text-left">
            <Label htmlFor="email" className="text-md font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="mt-1 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Bind email input
            />
          </div>

          {/* Password Field */}
          <div className="text-left">
            <label htmlFor="password" className="text-md font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              className="mt-1 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Bind password input
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember" className="border rounded-md bg-white"/>
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-gray-600 cursor-pointer"
              >
                Remember Me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-teal-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-xl">
              Login
            </Button>
          </div>
        </form>

        {/* Divider */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Don't have an account? <Link to="/signup" className="text-teal-600 hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
