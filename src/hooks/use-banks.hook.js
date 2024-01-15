import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user-context';
import { getBanksFromApi, getPaymentMethodsFromApi, refreshAccessToken } from '../utils/api-utils';

export const useBanks = (currency) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [allBanks, setAllBanks] = useState([])
  const [userPaymentMethods, setUserPaymentMethods] = useState([])

  const updateAccessToken = useCallback(async () => {
    try {
      const res = await refreshAccessToken(user.refreshToken);
      setUser({ ...user, accessToken: res.accessToken });
      localStorage.setItem('user', JSON.stringify({ ...user, accessToken: res.accessToken }));
      return res.accessToken;
    } catch (error) {
      localStorage.removeItem('user');
      navigate('/login');
      window.location.reload();
    }
  }, [navigate, setUser, user])

  const fetchBanksInfo = useCallback(async (token, currency) => {
    try {
      const res = await getBanksFromApi(token, currency);
      setAllBanks(res)
    } catch (error) {
      const newToken = await updateAccessToken();
      fetchBanksInfo(newToken, currency);
    }
  }, [updateAccessToken])

  const fetchUserPaymentMethods = useCallback(async (token) => {
    try {
      const res = await getPaymentMethodsFromApi(token);
      setUserPaymentMethods(res)
    } catch (error) {
      const newToken = await updateAccessToken();
      fetchUserPaymentMethods(newToken);
    }
  }, [updateAccessToken])

  useEffect(() => {
    if (user && user.accessToken) {
      fetchBanksInfo(user.accessToken, currency);
      fetchUserPaymentMethods(user.accessToken)
    }
  }, [user, fetchBanksInfo, fetchUserPaymentMethods, currency]);

  const addPaymentMethod = (payment) => {
    setUserPaymentMethods(state => {
      return [...state, payment]
    })
  }

  return { allBanks, userPaymentMethods, addPaymentMethod }
}
