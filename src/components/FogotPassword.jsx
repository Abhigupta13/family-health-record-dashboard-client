import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending a password reset link
    setMessage("Password reset link has been sent to your email.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#e3f9f1" }}>
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-teal-700">Forgot Password?</h2>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full border-gray-300 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" className="w-full bg-teal-600 text-white py-2 hover:bg-teal-700 transition-colors">
              Send Reset Link
            </Button>
          </div>
        </form>

        {/* Message */}
        {message && <p className="mt-4 text-green-600 text-center">{message}</p>}

        {/* Divider */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remembered your password? <a href="/login" className="text-teal-600 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
