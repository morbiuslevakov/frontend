import axios from "axios";

const apiUrl = "https://deaslideproperty.com/api";

export const apiConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

const buildAuthorizationApiConfig = (token) => {
  return {
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
}

const buildRefreshTonekBody = (refreshToken) => {
  return {
    "refreshToken": refreshToken
  }
}

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

export const postUserLoginToApi = async (payload) => {
  const url = `${apiUrl}/auth/signin`
  try {
    const response = await axios.post(url, payload, apiConfig)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
}

export const getWalletFromApi = async (token) => {
  const url = `${apiUrl}/wallet/balances/RUB`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.get(url, config)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
}

export const refreshAccessToken = async (refreshToken) => {
  const url = `${apiUrl}/auth/refresh-token`
  const payload = buildRefreshTonekBody(refreshToken)
  try {
    const response = await axios.post(url, payload, apiConfig)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
}

