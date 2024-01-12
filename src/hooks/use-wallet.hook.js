import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getWalletFromApi, refreshAccessToken } from '../utils/api-utils';
import UserContext from '../context/user-context';
import { createTokenData } from '../utils/wallet-utils';

export const useWallet = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [walletInfo, setWalletInfo] = useState({})
  const [userBalance, setUserBalance] = useState({});
  const [tokensRows, setTokensRows] = useState([]);
  const [currency, setCurrency] = useState("RUB")

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

  const fetchWalletInfo = useCallback(async (token, currency) => {
    try {
      const res = await getWalletFromApi(token, currency);
      setUserBalance(res.assets);
      setWalletInfo(res)
    } catch (error) {
      const newToken = await updateAccessToken();
      fetchWalletInfo(newToken);
    }
  }, [updateAccessToken])

  useEffect(() => {
    if (user && user.accessToken) {
      fetchWalletInfo(user.accessToken, currency);
    }
  }, [user, fetchWalletInfo, currency]);

  useEffect(() => {
    if (userBalance) {
      const newTokenRows = Object.keys(userBalance).map(key => {
        const currentItem = userBalance[key];
        const tokenPrice = currentItem.price.toFixed(2)
        const tokenBalance = currentItem.sum.toFixed(2)
        return createTokenData(currentItem.svgIcon, currentItem.alias, currentItem.balance, tokenBalance, tokenPrice);
      });
      setTokensRows(newTokenRows);
    }
  }, [userBalance]);

  return { user, tokensRows, walletInfo, currency, setCurrency }
}
