import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Passwords do not match.",
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${apiBaseUrl}/user/reset-password`, {
                token: token,
                password: password,
            });

            if (response.status === 200) {
                Swal.fire({
                    title: "Password Reset",
                    text: "Your password has been reset successfully.",
                    icon: "success",
                }).then(() => {
                    navigate("/login");
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.error || "Something went wrong. Please try again.",
            });
        } finally {
            setIsLoading(false);
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
                                Reset Password
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-[#8B4513]"
                                    >
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        name="password"
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block mb-2 text-sm font-medium text-[#8B4513]"
                                    >
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5"
                                        required
                                    />
                                </div>
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
                                            Resetting...
                                        </div>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;