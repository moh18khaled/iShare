import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState(0);
  const [accept, setAccept] = useState(false);
  const [errorHandler, setErrorHandler] = useState("");
  const [status, setStatus] = useState(0);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const submitRules = async (event) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let flag = true;
    event.preventDefault();
    setAccept(true);

    if (
      userName.length === 0 ||
      !emailPattern.test(email) ||
      password.length < 8 ||
      confirmPassword !== password ||
      age === 0
    ) {
      flag = false;
    }

    try {
      if (flag) {
        const response = await axios
          .post(`${apiBaseUrl}/user/signup`, {
            username: userName,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
            age: age,
          })
          .then((res) => console.log(res));

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

  return (
    <div className="h-screen bg-light-gray">
      <div className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 mt-6 text-3xl font-bold sm:text-4xl text-mainColor"
          >
            iShare
          </Link>
          <div className="w-full bg-gray-100 rounded-lg shadow-md sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6">
              {accept && status === 400 ? (
                <p className="text-red-500">*{errorHandler}</p>
              ) : (
                ""
              )}
              <h1 className="text-xl font-bold leading-tight tracking-tight text-mainColor md:text-2xl">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={submitRules}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-mainColor"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    value={userName}
                    name="username"
                    id="username"
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 blur-0 focus:outline-none focus:border-mainColor text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                    required=""
                  />
                  {userName.length === 0 && accept && (
                    <p className="text-red-500 mt-1">Username is required</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-mainColor"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    value={email}
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-mainColor block w-full p-2.5"
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
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-mainColor"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-mainColor block w-full p-2.5"
                    required=""
                  />
                  {password.length === 0 && accept ? (
                    <p className="text-red-500 mt-1">Password is required</p>
                  ) : password.length < 8 && accept ? (
                    <p className="text-red-500 mt-1">
                      Password should be at least 8 characters
                    </p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-mainColor"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    name="confirm-password"
                    id="confirm-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-mainColor block w-full p-2.5"
                    required=""
                  />
                  {confirmPassword.length === 0 && accept ? (
                    <p className="text-red-500 mt-1">
                      Confirm Password is required
                    </p>
                  ) : confirmPassword !== password && accept ? (
                    <p className="text-red-500 mt-1">Password doesn't match</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="age"
                    className="block mb-2 text-sm font-medium text-mainColor"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-mainColor block w-full p-2.5"
                    required=""
                  />
                  {age === 0 && accept ? (
                    <p className="text-red-500 mt-1">
                      Age Should be greater than 0
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-mainColor hover:bg-[#653f75] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-mainColor hover:underline"
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
