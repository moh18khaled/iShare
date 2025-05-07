import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import { User } from "../context/context";
import logo from "../assets/images/WeinfluenceLogo.png"


const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState(0);
  const [availableInterests, setAvailableInterests] = useState([]); // All available interests
  const [selectedInterests, setSelectedInterests] = useState([]); // User-selected interests
  const [walletNumber, setWalletNumber] = useState(""); // State for wallet number
  const [availableWalletTypes, setAvailableWalletTypes] = useState([]); // All available wallet types
  const [selectedWalletTypes, setSelectedWalletTypes] = useState([]); // User-selected wallet types
  const [availableHearAboutUs, setAvailableHearAboutUs] = useState([]); // All available "How did you hear about us?" options
  const [selectedHearAboutUs, setSelectedHearAboutUs] = useState(""); // User-selected "How did you hear about us?" option
  const [accept, setAccept] = useState(false);
  const [errorHandler, setErrorHandler] = useState(""); // State for single error message
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const [isLoading, setIsLoading] = useState(false); // State to manage loading spinner
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const { authProvider ,auth} = useContext(User);

  const userNow = useContext(User);
  console.log(userNow);
  // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Fetch signup data (interests, wallet types, etc.) from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/user/signup-data`);
        setAvailableInterests(response.data.categories); // Set available interests
        setAvailableHearAboutUs(response.data.heardAboutUs); // Set "How did you hear about us?" options
        setAvailableWalletTypes(response.data.walletTypes); // Set available wallet types
      } catch (error) {
        console.error("Error fetching signup data:", error);
      }
    };

    fetchData();
  }, [apiBaseUrl]);

  // Handle form submission
  const submitRules = async (event) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let flag = true;
    event.preventDefault();
    setAccept(true);

    // Validate form fields
    if (
      userName.length === 0 ||
      (authProvider !== "google" && !emailPattern.test(email)) ||
      (authProvider !== "google" && !passwordRegex.test(password)) || // Validate password using regex
      (authProvider !== "google" && confirmPassword !== password ) ||
      age === 0 ||
      selectedInterests.length === 0 || // Ensure at least one interest is selected
      (walletNumber.length > 0 && selectedWalletTypes.length === 0) ||
      (walletNumber.length === 0 && selectedWalletTypes.length > 0) // Ensure at least one wallet type is selected if wallet number is provided
    ) {
      flag = false;
    }

    try {
      if (flag) {
        setIsLoading(true); 
        // Set loading to true when the form is being submitted
        const response = await axios.post(`${apiBaseUrl}/user/signup`, {
         email:auth.email||email,
          username: userName,
          password,
          password_confirmation: confirmPassword,
          age,
          interests: selectedInterests,
          heardAboutUs: selectedHearAboutUs,
          walletNumber,
          walletTypes: selectedWalletTypes,
          authProvider,
        });
        console.log(response);
        const userDetails = response.data.data;
        console.log(userDetails);
        userNow.setAuth({ userDetails });
        // Show toast for verification of email
        if (response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: response.data.message, // Display the message from the backend
            icon: "info",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirect to the home page after email verification
              window.location.href = "/login";
            }
          });

          // Store user email in a cookie
          Cookies.set("userEmail", email, { expires: 7 });
        }
      }
    } catch (error) {
      console.log(error.response);
      Swal.fire({
        icon: "error",
        title: "Failed to Create Account",
        text: error.response.data.error,
      });
      if (error.response.status === 409) {
        setEmailError(true);
        setErrorHandler(error.response.data.error);
      }
    } finally {
      setIsLoading(false); // Set loading to false after the request is completed
    }
  };

  // Handle wallet type selection
  const handleWalletTypeChange = (e) => {
    const value = e.target.value;
    if (selectedWalletTypes.includes(value)) {
      // Remove the wallet type if already selected
      setSelectedWalletTypes(selectedWalletTypes.filter((type) => type !== value));
    } else {
      // Add the wallet type if not selected
      setSelectedWalletTypes([...selectedWalletTypes, value]);
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
              {accept && emailError ? (
                <p className="text-red-500">*{errorHandler}</p>
              ) : (
                ""
              )}
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#8B4513] md:text-2xl">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={submitRules}>
                {/* Username Field */}
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-[#8B4513]"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    value={userName}
                    name="username"
                    id="username"
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 blur-0 focus:outline-none focus:border-[#8B4513] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    required=""
                  />
                  {userName.length === 0 && accept && (
                    <p className="text-red-500 mt-1">Username is required</p>
                  )}
                </div>

                {/* Email Field */}
                {authProvider !== "google" && (
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
    {accept &&
      email.length > 0 &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && (
        <p className="text-red-500 mt-1">Email is not valid</p>
      )}
  </div>
)}


                {/* Password Field */}
                {authProvider !== "google" && (<div className="relative">
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
                  ) : !passwordRegex.test(password) && accept ? (
                    <p className="text-red-500 mt-1">
                      Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                    </p>
                  ) : null}
                </div>)}
                {/* Confirm Password Field */}

                {authProvider !== "google" && (
                <div className="relative">
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-[#8B4513]"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"} // Toggle input type
                      value={confirmPassword}
                      name="confirm-password"
                      id="confirm-password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5 pr-10" // Add padding for icon
                      required=""
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                      style={{ top: "50%", transform: "translateY(-50%)" }} // Ensure icon stays centered vertically
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
                    </button>
                  </div>
                  {confirmPassword.length === 0 && accept ? (
                    <p className="text-red-500 mt-1">
                      Confirm Password is required
                    </p>
                  ) : confirmPassword !== password && accept ? (
                    <p className="text-red-500 mt-1">Password doesn't match</p>
                  ) : null}
                </div>)}

                {/* Age Field */}
                <div>
                  <label
                    htmlFor="age"
                    className="block mb-2 text-sm font-medium text-[#8B4513]"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    name="age"
                    id="age"
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10); // Convert input to number
                      if (value >= 0 || e.target.value === "") {
                        // Allow only non-negative values
                        setAge(e.target.value);
                      }
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5"
                    required=""
                  />
                  {age === 0 && accept ? (
                    <p className="text-red-500 mt-1">
                      Age Should be greater than 0
                    </p>
                  ) : null}
                </div>

                {/* Interests Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#8B4513]">
                    Select your interests
                  </label>
                  <div className="space-y-2">
                    {availableInterests.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          value={option}
                          checked={selectedInterests.includes(option)} // Track selected interests
                          onChange={(e) => {
                            const value = e.target.value;
                            if (selectedInterests.includes(value)) {
                              // Remove the option if already selected
                              setSelectedInterests(selectedInterests.filter((item) => item !== value));
                            } else {
                              // Add the option if not selected
                              setSelectedInterests([...selectedInterests, value]);
                            }
                          }}
                          className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-[#8B4513]">{option}</span>
                      </label>
                    ))}
                  </div>
                  {accept && selectedInterests.length === 0 && (
                    <p className="text-red-500 mt-1">Please select at least one interest</p>
                  )}
                </div>

                {/* E-Wallet Number Field */}
                <div>
                  <label
                    htmlFor="wallet-number"
                    className="block mb-2 text-sm font-medium text-[#8B4513]"
                  >
                    E-Wallet Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={walletNumber}
                    name="wallet-number"
                    id="wallet-number"
                    onChange={(e) => setWalletNumber(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5"
                  />
                </div>

                {/* Wallet Types Field */}
                {walletNumber.length > 0 && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#8B4513]">
                      Select Wallet Type(s)
                    </label>
                    <div className="space-y-2">
                      {availableWalletTypes.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            value={option}
                            checked={selectedWalletTypes.includes(option)} // Track selected wallet types
                            onChange={handleWalletTypeChange}
                            className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-[#8B4513]">{option}</span>
                        </label>
                      ))}
                    </div>
                    {accept && walletNumber.length > 0 && selectedWalletTypes.length === 0 && (
                      <p className="text-red-500 mt-1">Please select at least one wallet type</p>
                    )}
                  </div>
                )}

                {/* Radio Buttons for "From where did you hear about us?" */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#8B4513]">
                    From where did you hear about us?
                  </label>
                  <div className="space-y-2">
                    {availableHearAboutUs.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="hearAboutUs"
                          value={option}
                          checked={selectedHearAboutUs === option} // Track selected option
                          onChange={(e) => setSelectedHearAboutUs(e.target.value)} // Update selected option
                          className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300"
                        />
                        <span className="ml-2 text-sm text-[#8B4513]">{option}</span>
                      </label>
                    ))}
                  </div>
                  {accept && selectedHearAboutUs.length === 0 && (
                    <p className="text-red-500 mt-1">Please select one option</p>
                  )}
                </div>

                {/* Submit Button */}
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
                      Creating account...
                    </div>
                  ) : (
                    "Create an account"
                  )}
                </button>

                {/* Login Link */}
                <p className="text-sm font-light text-[#030303]">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-[#8B4513] hover:underline"
                  >
                    Login here
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

export default SignUpPage;