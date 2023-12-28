import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getWalletFromApi, refreshAccessToken } from '../utils/api-utils';
import UserContext from '../context/user-context';
import { createTokenData } from '../utils/wallet-utils';

export const useWallet = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [userBalance, setUserBalance] = useState({});
  const [tokensRows, setTokensRows] = useState([]);

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

  const fetchWalletInfo = useCallback(async (token) => {
    try {
      const res = await getWalletFromApi(token);
      setUserBalance(res.balance);
    } catch (error) {
      const newToken = await updateAccessToken();
      fetchWalletInfo(newToken);
    }
  }, [updateAccessToken])

  useEffect(() => {
    if (user && user.accessToken) {
      fetchWalletInfo(user.accessToken);
    }
  }, [user, fetchWalletInfo]);

  useEffect(() => {
    if (userBalance) {
      const newTokenRows = Object.keys(userBalance).map(key => {
        const currentItem = userBalance[key];
        return createTokenData(currentItem.alias, currentItem.balance, 100, 2);
      });
      setTokensRows(newTokenRows);
    }
  }, [userBalance]);

  return { user, tokensRows }
}
