import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { useNavigate } from "react-router-dom";
import Footer from "../shared/Footer";

const AuthOptions = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [role, setRole] = useState("User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCard, setSelectedCard] = useState("User");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const UserData = { email, password, role };

    try {
      const response = await fetch(
        `http://localhost:8080/auth/${isSignUp ? "signup" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(UserData),
        }
      );

      const data = await response.json();
      if (data.success) {
        const existingToken = localStorage.getItem("token");

        if (!existingToken || existingToken === "undefined") {
          // If token is not present or is explicitly "undefined", set it
          localStorage.setItem("token", data.data.token);
          console.log("Token set:", data.data.token);
        } else {
          // If token exists, update it
          localStorage.setItem("token", data.data.token);
          console.log("Token updated:", data.data.token);
        }
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(`Error during ${isSignUp ? "sign-up" : "login"}:`, error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-xl overflow-hidden m-16">
          {/* Role Selection */}
          <div className="w-full md:w-1/2 p-8 flex flex-col items-center border-r border-gray-200 bg-blue-50">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Choose Your Role
            </h2>
            <div className="w-full space-y-4">
              {["User", "Doctor"].map((option) => (
                <div
                  key={option}
                  className={`p-5 rounded-xl shadow-md cursor-pointer transition-all duration-300 text-center 
                  ${
                    selectedCard === option
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 border border-gray-300"
                  }
                  hover:bg-blue-500 hover:text-white`}
                  onClick={() => {
                    setSelectedCard(option);
                    setRole(option);
                  }}
                >
                  <h3 className="text-lg font-medium">{option}</h3>
                  <p className="text-sm">
                    {option === "User"
                      ? "Access and manage family health records."
                      : "Manage patient records and prescriptions."}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Auth Form */}
          <div className="w-full md:w-1/2 p-8 flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </h2>

            <form className="w-full max-w-sm space-y-5" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Password Input with Eye Icon */}
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  id="terms"
                  className="mr-2 h-5 w-5"
                  required
                />
                <label htmlFor="terms">I agree to the Terms & Conditions</label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-xl py-3 text-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </button>
            </form>

            <p className="text-sm text-gray-700 text-center mt-5">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 font-semibold ml-1 hover:underline"
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthOptions;
