import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Signup submitted!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="text-left">
            <label htmlFor="name" className="text-md font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              className="mt-1 w-full"
            />
          </div>

          {/* Email Field */}
          <div className="text-left">
            <label htmlFor="email" className="text-md font-medium text-gray-700">
              Email
            </label>
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

          {/* Confirm Password Field */}
          <div className="text-left">
            <Label htmlFor="confirmPassword" className="text-md font-medium text-gray-700">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required
              className="mt-1 w-full"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            {/* Checkbox with custom blue background */}
            <input
              id="terms"
              type="checkbox"
              className="peer hidden"
            />
            <div className="w-5 h-5 bg-white border rounded-full peer-checked:bg-blue-700 flex-shrink-0"></div>
            <Label
              htmlFor="terms"
              type="radio"
              className="ml-2 text-sm text-gray-600 cursor-pointer"
            >
              I agree to the{" "}
              <a href="/terms" className="text-teal-600 hover:underline">
                terms and conditions
              </a>
            </Label>
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" className="w-full bg-teal-600 text-white py-2">
              Sign Up
            </Button>
          </div>
        </form>

        {/* Divider */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-teal-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;