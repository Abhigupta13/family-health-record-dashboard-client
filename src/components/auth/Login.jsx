import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login submitted!");
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
            <a
              href="/forgot-password"
              className="text-sm text-teal-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" className="w-full bg-teal-600 text-white py-2">
              Login
            </Button>
          </div>
        </form>

        {/* Divider */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Don't have an account? <a href="/signup" className="text-teal-600 hover:underline">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
