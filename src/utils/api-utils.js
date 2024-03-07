import axios from "axios";

const apiUrl = "https://api.deaslide.com/v1";

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
    throw error
  }
}

export const getBanksFromApi = async (token, currency) => {
  console.log(token, currency)
  const url = `${apiUrl}/p2p/get-banks/${currency}`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.get(url, config)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getPaymentMethodsFromApi = async (token) => {
  const url = `${apiUrl}/user/payment-methods`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.get(url, config)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const postPaymentMethodsToApi = async (token, payload) => {
  const url = `${apiUrl}/user/payment-methods`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.post(url, payload, config)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const refreshAccessToken = async (refreshToken) => {
  const url = `${apiUrl}/auth/refresh-token`
  const payload = buildRefreshTokenBody(refreshToken)
  try {
    const response = await axios.post(url, payload, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getCurrenciesFromApi = async (token) => {
  const url = `${apiUrl}/wallet/balances`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.get(url, config)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getUserDetailsFromApi = async (token) => {
  const url = `${apiUrl}/user/details`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.get(url, config)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const postOrderToApi = async (token, payload) => {
  const url = `${apiUrl}/p2p/create-order`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.post(url, payload, config)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getCurrencies = async (token) => {
  const currencies = localStorage.getItem("currencies")
  if (currencies) {
    return JSON.parse(currencies)
  } else {
    const currenciesFromApi = await getCurrenciesFromApi(token)
    localStorage.setItem("currencies", JSON.stringify(currenciesFromApi))
    return currenciesFromApi
  }
}

export const getOrders = async (token, payload, page) => {
  const url = `${apiUrl}/p2p/get-orders?page=${page}`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.post(url, payload, config)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getCryptoFromApi = async (token, currency) => {
  const url = `${apiUrl}/p2p/rates/${currency}`
  const config = buildAuthorizationApiConfig(token)
  try {
    const response = await axios.get(url, config)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const initDealToApi = async (payload) => {
  const url = `${apiUrl}/p2p/init-deal`;
  try {
    const response = await axios.post(url, payload, apiConfig)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
};

export const makePaymentsFromApi = async (dealId) => {
  const url = `${apiUrl}/p2p/make-payment/${dealId}`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}


export const confirmPaymentApi = async (dealId) => {
  const url = `${apiUrl}/p2p/confirm-payment/${dealId}`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getUserDealsFromApi = async () => {
  const url = `${apiUrl}/p2p/get-deals`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}
