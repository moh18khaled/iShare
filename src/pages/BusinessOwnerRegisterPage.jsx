import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGlobe } from "react-icons/fa";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { User } from "../context/context";
import logo from "../assets/images/WeinfluenceLogo.png"

const BusinesssOwnerRegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState(0);
  const [businessName, setBusinessName] = useState("");
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [addresscountry, setAddresscountry] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [description, setDescription] = useState("");
  const [accept, setAccept] = useState(false);
  const [errorHandler, setErrorHandler] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const businessOwnerNow = useContext(User);

  // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  // Website URL validation regex
  const websiteRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/businessOwner/signup-data`);
        setAvailableCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching signup data:", error);
      }
    };

    fetchData();
  }, [apiBaseUrl]);

  const validateWebsiteUrl = (url) => {
    if (!url) return true; // Empty is allowed
    if (!websiteRegex.test(url)) {
      setWebsiteError("Please enter a valid website URL (e.g., https://example.com)");
      return false;
    }
    setWebsiteError("");
    return true;
  };

  const submitRules = async (event) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let flag = true;
    event.preventDefault();
    setAccept(true);

    // Validate website URL
    const isWebsiteValid = validateWebsiteUrl(websiteUrl);
    
    if (
      userName.length === 0 ||
      !emailPattern.test(email) ||
      !passwordRegex.test(password) ||
      confirmPassword !== password ||
      age === 0 ||
      businessName.length === 0 ||
      selectedCategories.length === 0 ||
      addresscountry.length === 0 ||
      addressCity.length === 0 ||
      phoneNumber.length === 0 ||
      !isWebsiteValid
    ) {
      flag = false;
    }

    try {
      if (flag) {
        setIsLoading(true);
        const response = await axios.post(`${apiBaseUrl}/businessOwner/signup`, {
          username: userName,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
          age: age,
          businessName: businessName,
          categories: selectedCategories,
          address: {
            country: addresscountry,
            city: addressCity,
          },
          phoneNumber: phoneNumber,
          website: websiteUrl,
          description: description,
        });

        const businessOwnerDetails = response.data;
        businessOwnerNow.setBusinessOwnerAuth({ businessOwnerDetails });

        if (response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "info",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/login";
            }
          });

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
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (value) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
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
                {/* <div>
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
                </div> */}

                {/* Business Name Field */}
                <div>
                  <label
                    htmlFor="business-name"
                    className="block mb-2 text-sm font-medium text-[#8B4513]"
                  >
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    name="business-name"
                    id="business-name"
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5"
                    required=""
                  />
                  {businessName.length === 0 && accept ? (
                    <p className="text-red-500 mt-1">
                      BusinessName is Required
                    </p>
                  ) : null}
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
                    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && (
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
                      type={showPassword ? "text" : "password"}
                      value={password}
                      name="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5 pr-10"
                      required=""
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ top: "50%", transform: "translateY(-50%)" }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {password.length === 0 && accept ? (
                    <p className="text-red-500 mt-1">Password is required</p>
                  ) : !passwordRegex.test(password) && accept ? (
                    <p className="text-red-500 mt-1">
                      Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character.
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
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      name="confirm-password"
                      id="confirm-password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5 pr-10"
                      required=""
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ top: "50%", transform: "translateY(-50%)" }}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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
                      const value = parseInt(e.target.value, 10);
                      if (value >= 0 || e.target.value === "") {
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

                

                {/* Business Categories Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#8B4513]">
                    Select Business Categories
                  </label>
                  <div className="space-y-2">
                    {availableCategories.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          value={option}
                          checked={selectedCategories.includes(option)}
                          onChange={(e) => handleCategoryChange(e.target.value)}
                          className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-[#8B4513]">{option}</span>
                      </label>
                    ))}
                  </div>
                  {accept && selectedCategories.length === 0 && (
                    <p className="text-red-500 mt-1">Please select at least one category</p>
                  )}
                </div>

                {/* Address (Country) Field */}
                <div>
                  <label
                    htmlFor="address-country"
                    className="block mb-2 text-sm font-medium text-[#8B4513]"
                  >
                    Address (Country)
                  </label>
                  <input
                    type="text"
                    value={addresscountry}
                    name="address-country"
                    id="address-country"
                    onChange={(e) => setAddresscountry(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5"
                    required=""
                  />
                  {addresscountry.length === 0 && accept ? (
                    <p className="text-red-500 mt-1">
                      Address Country is Required
                    </p>
                  ) : null}
                </div>

                {/* Address (City) Field */}
                <div>
                  <label
                    htmlFor="address-city"
                    className="block mb-2 text-sm font-medium text-[#8B4513]"
                  >
                    Address (City)
                  </label>
                  <input
                    type="text"
                    value={addressCity}
                    name="address-city"
                    id="address-city"
                    onChange={(e) => setAddressCity(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5"
                    required=""
                  />
                  {addressCity.length === 0 && accept ? (
                    <p className="text-red-500 mt-1">
                      Address city is Required
                    </p>
                  ) : null}
                </div>

                {/* Phone Number Field */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-[#8B4513]"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    name="phoneNumber"
                    id="phoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5"
                    required=""
                  />
                  {phoneNumber.length === 0 && accept ? (
                    <p className="text-red-500 mt-1">
                      Phone Number is Required
                    </p>
                  ) : null}
                </div>

                {/* Website URL Field */}
                <div>
                  <label
                    htmlFor="websiteUrl"
                    className="block mb-2 text-sm font-medium text-[#8B4513]"
                  >
                    Website URL (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaGlobe className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={websiteUrl}
                      name="websiteUrl"
                      id="websiteUrl"
                      onChange={(e) => {
                        setWebsiteUrl(e.target.value);
                        if (accept) validateWebsiteUrl(e.target.value);
                      }}
                      placeholder="https://example.com"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full pl-10 p-2.5"
                    />
                  </div>
                  {websiteError && (
                    <p className="text-red-500 mt-1">{websiteError}</p>
                  )}
                </div>

                {/* Description Field */}
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-[#8B4513]"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    value={description}
                    name="description"
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5"
                    required=""
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full text-white bg-[#8B4513] hover:bg-[#030303] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
                  disabled={isLoading}
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

export default BusinesssOwnerRegisterPage;