import { useEffect, useState } from 'react';
import { getCurrencies, getUserDetailsFromApi } from '../utils/api-utils';
import { useWallet } from './use-wallet.hook'
import { useApiRequest } from './use-api-request.hook';

export const useP2P = () => {
  const apiRequest = useApiRequest();
  const [allCurrencies, setAllCurrencies] = useState([])
  const { walletInfo, currency, setCurrency } = useWallet();
  const allTokens = []
  const [limit, setLimit] = useState(walletInfo.limit)
  const [userDetails, setUserDetails] = useState([])

  useEffect(() => {
    const fetchCurrencies = async () => {
      const currencies = await apiRequest(getCurrencies)
      return currencies.providedCurrencies
    }
    if (Object.keys(walletInfo).length) {
      fetchCurrencies().then(res => {
        setAllCurrencies(res)
      }).catch(error => {
        console.log(error)
      })
    }
    setLimit(walletInfo.limit)
  }, [walletInfo, apiRequest])

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetailsFromApi = await apiRequest(getUserDetailsFromApi)
      return userDetailsFromApi
    }
    fetchUserDetails().then(res => { setUserDetails(res) }).catch(error => {
      console.log(error)
    })
  }, [apiRequest])

  const tokens = walletInfo.assets;

  if (tokens) {
    Object.keys(tokens).forEach((key) => {
      allTokens.push(tokens[key])
    })
  }

  // console.log(allTokens)
  // console.log(allTokens.length)

  // console.log(walletInfo)

  // console.log(allCurrencies)

  // console.log(allCurrencies.length)

  const isLoading = allTokens.length && walletInfo && allCurrencies.length;

  return { walletInfo, allTokens, isLoading, allCurrencies, currency, setCurrency, limit, userDetails }
}
