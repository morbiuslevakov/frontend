import { useContext, useEffect, useState } from 'react';
import { getCurrenciesFromApi, getUserDetailsFromApi } from '../utils/api-utils';
import { useWallet } from './use-wallet.hook'
import UserContext from '../context/user-context';

export const useP2P = () => {
  const [allCurrencies, setAllCurrencies] = useState([])
  const { user } = useContext(UserContext)
  const { walletInfo, currency, setCurrency } = useWallet();
  const allTokens = []
  const [limit, setLimit] = useState(walletInfo.limit)
  const [userDetails, setUserDetails] = useState([])

  useEffect(() => {
    const fetchCurrencies = async () => {
      const currencies = await getCurrenciesFromApi(user.accessToken)
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
  }, [user.accessToken, walletInfo])

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetailsFromApi = await getUserDetailsFromApi(user.accessToken)
      return userDetailsFromApi
    }
    fetchUserDetails().then(res => { setUserDetails(res) }).catch(error => {
      console.log(error)
    })
  }, [user.accessToken])

  const tokens = walletInfo.assets;

  if (tokens) {
    Object.keys(tokens).forEach((key) => {
      allTokens.push(tokens[key])
    })
  }

  const isLoading = allTokens.length && walletInfo && allCurrencies.length;

  return { walletInfo, allTokens, isLoading, allCurrencies, currency, setCurrency, limit, user, userDetails }
}
