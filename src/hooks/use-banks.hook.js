import { useCallback, useContext, useEffect, useState } from 'react'
import UserContext from '../context/user-context';
import { getBanksFromApi, getPaymentMethodsFromApi } from '../utils/api-utils';
import { useApiRequest } from './use-api-request.hook';

export const useBanks = (currency) => {
  const apiRequest = useApiRequest();
  const { user } = useContext(UserContext);
  const [allBanks, setAllBanks] = useState([])
  const [userPaymentMethods, setUserPaymentMethods] = useState([])

  const fetchBanksInfo = useCallback(async (currency) => {
    try {
      const res = await apiRequest(getBanksFromApi, currency)
      setAllBanks(res)
    } catch (error) {
      console.log(error)
    }
  }, [apiRequest])

  const fetchUserPaymentMethods = useCallback(async () => {
    try {
      const res = await apiRequest(getPaymentMethodsFromApi)
      setUserPaymentMethods(res)
    } catch (error) {
      console.log(error)
    }
  }, [apiRequest])

  useEffect(() => {
    if (user && user.accessToken) {
      fetchBanksInfo(currency);
      fetchUserPaymentMethods()
    }
  }, [user, fetchBanksInfo, fetchUserPaymentMethods, currency]);

  const addPaymentMethod = (payment) => {
    setUserPaymentMethods(state => {
      return [...state, payment]
    })
  }

  return { allBanks, userPaymentMethods, addPaymentMethod }
}
