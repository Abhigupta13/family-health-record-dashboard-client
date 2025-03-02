import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import Navbar from "../shared/Navbar";
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

    if (isSignUp) {
      // Handle sign-up logic
      try {
        const response = await fetch("http://localhost:8080/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(UserData),
        });
        const data = await response.json();
        if (data.success) {
          navigate("/dashboard"); 
        } else {
          alert(data.message); // Show error message
        }
      } catch (error) {
        console.error("Error during sign-up:", error);
      }
    } else {
      // Handle login logic
      try {
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(UserData),
        });
        const data = await response.json();
        if (data.success) {
          localStorage.setItem("authToken", data.token); 
          navigate("/dashboard"); // Redirect to home page after successful login
        } else {
          alert(data.message); // Show error message
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 sm:px-6 lg:px-8 ">
        <div className="flex flex-col md:flex-row w-full max-w-5xl max-h-5xl bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Role Selection */}
          <div className="w-full md:w-1/2 p-6 flex flex-col items-center border-r border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Choose Role</h2>
            <div className="w-full space-y-4">
              <div 
                className={`p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${selectedCard === "User" ? "bg-teal-500 text-white" : "bg-gray-100"}`}
                onClick={() => { setSelectedCard("User"); setRole("User"); }}
              >
                <h3 className="text-md font-medium">User</h3>
                <p className="text-sm">Access and manage family health records.</p>
              </div>
              <div 
                className={`p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${selectedCard === "Doctor" ? "bg-teal-500 text-white" : "bg-gray-100"}`}
                onClick={() => { setSelectedCard("Doctor"); setRole("Doctor"); }}
              >
                <h3 className="text-md font-medium">Doctor</h3>
                <p className="text-sm">Manage patient records and prescriptions.</p>
              </div>
            </div>
          </div>

          {/* Auth Form */}
          <div className="w-full md:w-1/2 p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">
              {isSignUp ? "Sign Up" : "Log In"}
            </h2>
            <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-2 border border-gray-300 rounded" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <div className="relative">
                <input 
                  type={passwordVisible ? "text" : "password"} 
                  placeholder="Password" 
                  className="w-full p-2 border border-gray-300 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              <div className="flex items-center text-sm">
                <input type="checkbox" id="terms" className="mr-2" required />
                <label htmlFor="terms">I agree to the Terms & Conditions</label>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-teal-500 text-white rounded-lg py-2 hover:bg-teal-600 transition duration-300"
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </button>
            </form>
            
            <p className="text-sm text-center mt-4">
              {isSignUp ? "Already have an account?" : "Don't have an account?"} 
              <button 
                onClick={() => setIsSignUp(!isSignUp)} 
                className="text-blue-600 underline ml-1"
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
        
        <Footer/>
      </div>
    </>
  );
};

export default AuthOptions;
