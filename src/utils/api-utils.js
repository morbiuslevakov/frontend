import axios from "axios";

const apiUrl = "https://api.deaslide.com/v1";

export const apiConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

const buildRefreshTokenBody = (refreshToken) => {
  return {
    "refreshToken": refreshToken
  }
}

export const confirmAccountApi = async (token) => {
  const url = `${apiUrl}/auth/confirm-account/${token}`;
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
};

export const resendConfirmApi = async (email) => {
  const url = `${apiUrl}/auth/send-confirmation?principal=${email}`;
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
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

export const changePasswordApi = async (payload) => {
  const url = `${apiUrl}/security/change-password`;
  try {
    const response = await axios.post(url, payload, apiConfig)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
};

export const signOutApi = async () => {
  const url = `${apiUrl}/auth/signout`;
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
};

export const changeUsernameApi = async (username) => {
  const url = `${apiUrl}/user/change-username?username=${username}`;
  try {
    const response = await axios.post(url, apiConfig)
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
    throw error
  }
}

export const getWalletFromApi = async (currency) => {
  const url = `${apiUrl}/wallet/balances/${currency}`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getBanksFromApi = async (currency) => {
  const url = `${apiUrl}/p2p/get-banks/${currency}`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getPaymentMethodsFromApi = async () => {
  const url = `${apiUrl}/user/payment-methods`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const postPaymentMethodsToApi = async (payload) => {
  const url = `${apiUrl}/user/payment-methods`
  try {
    const response = await axios.post(url, payload, apiConfig)
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

export const getCurrenciesFromApi = async () => {
  const url = `${apiUrl}/wallet/balances`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const sendTokensApi = async (payload) => {
  const url = `${apiUrl}/wallet/send`
  try {
    const response = await axios.post(url, payload, apiConfig)
    return response.data;
  } catch (error) {
    const apiError = error.response.data
    throw apiError
  }
}

export const getUserDetailsFromApi = async () => {
  const url = `${apiUrl}/user/details`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const postOrderToApi = async (payload) => {
  const url = `${apiUrl}/p2p/create-order`
  try {
    const response = await axios.post(url, payload, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getCurrencies = async () => {
  const currencies = localStorage.getItem("currencies")
  if (currencies) {
    return JSON.parse(currencies)
  } else {
    const currenciesFromApi = await getCurrenciesFromApi()
    localStorage.setItem("currencies", JSON.stringify(currenciesFromApi))
    return currenciesFromApi
  }
}

export const getUserOrders = async () => {
  const url = `${apiUrl}/p2p/get-orders`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getOrders = async (payload, page) => {
  const url = `${apiUrl}/p2p/get-orders?page=${page}`
  try {
    const response = await axios.post(url, payload, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getCryptoFromApi = async (currency) => {
  const url = `${apiUrl}/p2p/rates/${currency}`
  try {
    const response = await axios.get(url, apiConfig)
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

export const proofPaymentApi = async (dealId) => {
  const url = `${apiUrl}/p2p/proof-payment/${dealId}`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const acceptDealApi = async (dealId) => {
  const url = `${apiUrl}/p2p/accept-deal/${dealId}`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const rejectDealApi = async (dealId) => {
  const url = `${apiUrl}/p2p/reject-deal/${dealId}`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const cancelOrderApi = async (orderId) => {
  const url = `${apiUrl}/p2p/cancel-order/${orderId}`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const cancelDealApi = async (dealId) => {
  const url = `${apiUrl}/p2p/cancel-deal/${dealId}`
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

export const getDealFromApi = async (dealId) => {
  const url = `${apiUrl}/p2p/get-deal/${dealId}`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const sendMessageChatApi = async (payload) => {
  const url = `${apiUrl}/chat/send`
  try {
    const response = await axios.post(url, payload, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getChatFromApi = async (chatId) => {
  const url = `${apiUrl}/chat/get-chat/${chatId}`
  try {
    const response = await axios.get(url, apiConfig)
    return response.data;
  } catch (error) {
    throw error
  }
}
