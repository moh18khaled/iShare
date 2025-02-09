import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState(0);
  const [interests, setInterests] = useState([]); // State for selected interests
  const [walletNumber, setWalletNumber] = useState(""); // State for wallet number
  const [walletTypes, setWalletTypes] = useState([]); // State for selected wallet types
  const [hearAboutUs,setHearAboutUs] = useState("");
  const [accept, setAccept] = useState(false);
  const [errorHandler, setErrorHandler] = useState("");
  const [status, setStatus] = useState(0);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const apiBaseUrl = "http://localhost:5000";

  // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // List of wallet types
  const walletOptions = [
    "Vodafone Cash",
    "Etisalat Cash",
    "Orange Cash",
    "WE Pay",
    "Meeza",
    "Fawry Wallet",
    "BM Wallet",
    "CIB Smart Wallet",
    "Ahly Phone Cash",
    "QNB Mobile Wallet",
    "Alex Bank Mobile Wallet",
    "ADIB Wallet",
    "ValU",
  ];

  const submitRules = async (event) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let flag = true;
    event.preventDefault();
    setAccept(true);

    // Validate form fields
    if (
      userName.length === 0 ||
      !emailPattern.test(email) ||
      !passwordRegex.test(password) || // Validate password using regex
      confirmPassword !== password ||
      age === 0 ||
      interests.length === 0 || // Ensure at least one interest is selected
      (walletNumber.length > 0 && walletTypes.length === 0) // Ensure at least one wallet type is selected if wallet number is provided
    ) {
      flag = false;
    }

    try {
      if (flag) {
        const response = await axios.post(`${apiBaseUrl}/user/signup`, {
          username: userName,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
          age: age,
          interests: interests,
          walletNumber: walletNumber, // Include wallet number in the request
          walletTypes: walletTypes, // Include selected wallet types in the request
        });
        console.log(response);

        setStatus(200);

        window.localStorage.setItem("email", email);
        window.location.pathname = "/";
      }
    } catch (error) {
      console.log(error);
      setStatus(error.response.status);
      setErrorHandler(error.response.data.error.message);
    }
  };

  // Handle wallet type selection
  const handleWalletTypeChange = (e) => {
    const value = e.target.value;
    if (walletTypes.includes(value)) {
      // Remove the wallet type if already selected
      setWalletTypes(walletTypes.filter((type) => type !== value));
    } else {
      // Add the wallet type if not selected
      setWalletTypes([...walletTypes, value]);
    }
  };

  return (
    <div className="h-screen bg-light-gray">
      <div className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 mt-6 text-3xl font-bold sm:text-4xl text-[#8B4513]"
          >
            iShare
          </Link>
          <div className="w-full bg-[#E8D8C5] rounded-lg shadow-md sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6">
              {accept && status === 400 ? (
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
                    className="bg-gray-50 border border-gray-300 blur-0 focus:outline-none focus:border-[#8B4513] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                    required=""
                  />
                  {userName.length === 0 && accept && (
                    <p className="text-red-500 mt-1">Username is required</p>
                  )}
                </div>

                {/* Email Field */}
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
                    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      email
                    ) && (
                      <p className="text-red-500 mt-1">Email is not valid</p>
                    )}
                </div>

                {/* Password Field */}
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
                  ) : !passwordRegex.test(password) && accept ? (
                    <p className="text-red-500 mt-1">
                      Password must be at least 8 characters contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                    </p>
                  ) : null}
                </div>

                {/* Confirm Password Field */}
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
                </div>

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
                    {["option1", "option2", "option3", "option4"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          value={option}
                          checked={interests.includes(option)}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (interests.includes(value)) {
                              // Remove the option if already selected
                              setInterests(interests.filter((item) => item !== value));
                            } else {
                              // Add the option if not selected
                              setInterests([...interests, value]);
                            }
                          }}
                          className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-[#8B4513]">{option}</span>
                      </label>
                    ))}
                  </div>
                  {accept && interests.length === 0 && (
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
                      {walletOptions.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            value={option}
                            checked={walletTypes.includes(option)}
                            onChange={handleWalletTypeChange}
                            className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-[#8B4513]">{option}</span>
                        </label>
                      ))}
                    </div>
                    {accept && walletNumber.length > 0 && walletTypes.length === 0 && (
                      <p className="text-red-500 mt-1">Please select at least one wallet type</p>
                    )}
                  </div>
                )}
{/* Radio Buttons for from where did you hear about us */}
<div>
  <label className="block mb-2 text-sm font-medium text-[#8B4513]">
    From wher did you hear about us ? 
  </label>
  <div className="space-y-2">
    {["option1", "option2", "option3", "option4" , "other"].map((option) => (
      <label key={option} className="flex items-center">
        <input
          type="radio"
          name="single-select"
          value={option}
          checked={hearAboutUs === option}
          onChange={(e) => setHearAboutUs(e.target.value)}
          className="h-4 w-4 text-[#8B4513] focus:bg-mainColor focus:ring-[#8B4513] border-gray-300"
        />
        <span className="ml-2 text-sm text-[#8B4513]">{option}</span>
      </label>
    ))}
  </div>
</div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full text-white bg-[#8B4513] hover:bg-[#030303] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
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