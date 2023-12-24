import axios from "axios";

const apiUrl = "https://deaslideproperty.com/api";

export const apiConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const postUserToApi = async (payload) => {
  const url = `${apiUrl}/auth/signup`;
  try {
    const response = await axios.post(url, payload, apiConfig)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
};