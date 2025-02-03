import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accept, setAccept] = useState(false);
    const [errorHandler, setErrorHandler] = useState("");
    const [status, setStatus] = useState(0);
    const apiBaseUrl = "http://localhost:5000";

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
                    password : password,
                }).then((res)=>console.log(res));
                
                setStatus(200);
                window.localStorage.getItem("email",email);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            setStatus(error.response.status);
            setErrorHandler(error.response.data.error.message);
        }
    };

    return (
        <div className='h-screen bg-light-gray'>
            <div className="bg-white">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
                    <Link to="/" className="flex items-center mb-6 mt-6 text-3xl font-bold sm:text-4xl text-mainColor">
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
                                Login
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={submitRules}>
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
                                    {accept && email.length > 0 && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && (
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
                                
                                
                                <button
                                    type="submit"
                                    className="w-full text-white bg-mainColor hover:bg-[#653f75] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Login
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    Don't have an account?{' '}
                                    <Link
                                        to="/register-select"
                                        className="font-medium text-mainColor hover:underline"
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
