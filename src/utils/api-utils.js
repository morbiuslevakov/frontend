import axios from "axios";

const apiUrl = "https://api.deaslide.com/api";

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

const buildRefreshTokenBody = (refreshToken) => {
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

export const getWalletFromApi = async (token, currency) => {
  const url = `${apiUrl}/wallet/balances/${currency}`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.get(url, config)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
}

export const getBanksFromApi = async (token, currency) => {
  const url = `${apiUrl}/p2p/get-banks/${currency}`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.get(url, config)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
}

export const getPaymentMethodsFromApi = async (token) => {
  const url = `${apiUrl}/user/payment-methods`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.get(url, config)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
}

export const postPaymentMethodsToApi = async (token, payload) => {
  const url = `${apiUrl}/user/payment-methods`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.post(url, payload, config)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
}

export const refreshAccessToken = async (refreshToken) => {
  const url = `${apiUrl}/auth/refresh-token`
  const payload = buildRefreshTokenBody(refreshToken)
  try {
    const response = await axios.post(url, payload, apiConfig)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
}

export const getCurrenciesFromApi = async (token) => {
  const url = `${apiUrl}/wallet/balances`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.get(url, config)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
}

export const getUserDetailsFromApi = async (token) => {
  const url = `${apiUrl}/user/details`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.get(url, config)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
}

export const postOrderToApi = async (token, payload) => {
  const url = `${apiUrl}/p2p/create-order`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.post(url, payload, config)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
}