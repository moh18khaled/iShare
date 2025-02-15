import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getOtherUserAccount = async (userId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/user/account/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Something went wrong" };
  }
};
