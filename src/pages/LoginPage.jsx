import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import Cookies from 'js-cookie'; // Import js-cookie
import Swal from 'sweetalert2'

const LoginPage = () => {
    const navigate = useNavigate();
    const [emailError,setEmailError] =  useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accept, setAccept] = useState(false);
    const [errorHandler, setErrorHandler] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const submitRules = async (event) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let flag = true;
        event.preventDefault();
        setAccept(true);

        if (
            !emailPattern.test(email) || 
            password.length < 8
        ) {
            flag = false;
        }

        try {
            if (flag) {
                const response = await axios.post(`${apiBaseUrl}/user/login`, {
                    email: email,
                    password: password,
                }, {
                    withCredentials: true, // Include cookies in the request
                });
                console.log(response);
                

                // Store the user's email in a cookie
                Cookies.set("userEmail", email, { expires: 7 }); // Expires in 7 days

                // Redirect to the home page
                Swal.fire({
                    title: "Logged In Successfully",
                    icon: "success",
                    draggable: true,
                  }).then((result)=>{
                    if(result.isConfirmed){
                        navigate("/");
                    }
                  });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Logged in failed",
                text: "Something went wrong!",
              });
            if(error.response.status===404){
                setEmailError(true);
            setErrorHandler(error.response.data.error);
            }
            
        }
    };

    return (
        <div className='h-screen bg-light-gray'>
            <div className="bg-white">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
                    <Link to="/" className="flex items-center mb-6 mt-6 text-3xl font-bold sm:text-4xl text-[#8B4513]">
                        weinfluence
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
                                
                                <button
                                    type="submit"
                                    className="w-full text-white bg-[#8B4513] hover:bg-[#030303] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Login
                                </button>
                                {accept && emailError ? (
                                <p className="text-red-500 text-lg">*{errorHandler}</p>
                            ) : (
                                ""
                            )}
                                <p className="text-sm font-light text-[#030303]">
                                    Don't have an account?{' '}
                                    <Link
                                        to="/register-select"
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