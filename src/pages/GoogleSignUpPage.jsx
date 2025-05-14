import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { User } from "../context/context"; // Assuming you have a UserContext

const GoogleSignUpPage = () => {
  const { setAuthProvider,setAuth } = useContext(User); // Access the context value to set authProvider
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential); // Decode the JWT token
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

      const res = await axios.post(`${apiBaseUrl}/auth/signup/google`, {
        email: decoded.email,
        name: decoded.name,
        googleId: decoded.sub,
      });
   //   cosnole.log(res);

      // Set the authProvider in your context
      setAuthProvider("google"); // Update the authProvider value to "google"
      setAuth({ email: decoded.email });
      Swal.fire({
        icon: "success",
        title: "Signed up successfully!",
        text: res.data.message,
      });

      navigate("/register");
    } catch (error) {
      //cosnole.log(error);

      Swal.fire({
        icon: "error",
        title: "Sign-up Failed",
        text: error || "Something went wrong",
      });
    }
  };

  const handleError = () => {
    Swal.fire({
      icon: "error",
      title: "Google Sign-up Failed",
      text: "Please try again later.",
    });
  };

  const handleSkip = () => {
    navigate("/register"); // Navigate to manual signup route
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign up with Google</h2>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        <div className="mt-4">
          <button
            onClick={handleSkip}
            className="text-sm text-blue-500 hover:underline"
          >
            Skip and sign up manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignUpPage;
