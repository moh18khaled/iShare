import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import Cookies from "js-cookie"; // Import js-cookie
import Swal from "sweetalert2";
import { User } from "../context/context";
import logo from "../assets/images/WeinfluenceLogo.png"
const LoginPage = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [errorHandler, setErrorHandler] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [isLoading, setIsLoading] = useState(false); // State to manage loading spinner
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const userNow = useContext(User);

  const submitRules = async (event) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let flag = true;
    event.preventDefault();
    setAccept(true);

    if (!emailPattern.test(email) || password.length < 8) {
      flag = false;
    }

    try {
      if (flag) {
        setIsLoading(true); // Set loading to true when the form is being submitted
        const response = await axios.post(`${apiBaseUrl}/user/login`, {
          email: email,
          password: password,
        }, {
          withCredentials: true, // Include cookies in the request
        });
        console.log("<><>><", response);
        const role = response.data.data.user.role;
        const userDetails = response.data.data.user;
        const businessOwnerDetails = response.data.data.user;
        const getProfilePicture = response.data.data.user.profilePicture;

        if (role === "user") {
          userNow.setAuth({ userDetails });
          userNow.setProfilePicture(getProfilePicture);
        } else if (role === "businessOwner") {
          userNow.setBusinessOwnerAuth({ businessOwnerDetails });
          userNow.setProfilePicture(getProfilePicture);
        }

        // Store the user's email in a cookie
        Cookies.set("user", email, { expires: 7 }); // Expires in 7 days

        if (response.status === 200) {
          // Redirect to the home page
          Swal.fire({
            title: response.data.message,
            icon: "success",
            draggable: true,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Logged in failed",
        text: error.response.data?.error,
      });
      if (error.response.status === 404) {
        setEmailError(true);
        setErrorHandler(error.response.data.error);
      }
      if (error.response.status === 403) {
        setEmailError(true);
        setErrorHandler(error.response.data.error);
      }
    } finally {
      setIsLoading(false); // Set loading to false after the request is completed
    }
  };

  return (
    <div className="h-screen bg-light-gray">
      <div className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center">
            <img
            className="w-36 h-24 lg:w-48 lg:h-28 lg:ml-16 ml-1 object-contain"
            src={logo}
            alt="weinfluence logo"
          />
            </div>
          </Link>
          <div className="w-full bg-[#E8D8C5] rounded-lg shadow-md sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#8B4513] md:text-2xl">
                Login
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={submitRules}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-[#8B4513]"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    value={email}
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5"
                    required=""
                  />
                  {accept && email.length === 0 && (
                    <p className="text-red-500 mt-1">Email is required</p>
                  )}
                  {accept && email.length > 0 && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && (
                    <p className="text-red-500 mt-1">Email is not valid</p>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-[#8B4513]"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"} // Toggle input type
                      value={password}
                      name="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5 pr-10" // Add padding for icon
                      required=""
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                      style={{ top: "50%", transform: "translateY(-50%)" }} // Ensure icon stays centered vertically
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
                    </button>
                  </div>
                  {password.length === 0 && accept ? (
                    <p className="text-red-500 mt-1">Password is required</p>
                  ) : password.length < 8 && accept ? (
                    <p className="text-red-500 mt-1">
                      Password should be at least 8 characters
                    </p>
                  ) : null}
                </div>
                <p className="text-sm font-light text-[#030303]">
                  Forgot your password?{" "}
                  <Link
                    to="/forgot-password"
                    className="font-medium text-[#8B4513] hover:underline"
                  >
                    Reset it here
                  </Link>
                </p>
                <button
                  type="submit"
                  className="w-full text-white bg-[#8B4513] hover:bg-[#030303] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
                  disabled={isLoading} // Disable the button when loading
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
                {accept && emailError ? (
                  <p className="text-red-500 text-lg">*{errorHandler}</p>
                ) : (
                  ""
                )}
                <p className="text-sm font-light text-[#030303]">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-[#8B4513] hover:underline"
                  >
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;