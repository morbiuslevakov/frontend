import { useCallback, useContext, useEffect, useState } from 'react'
import { getWalletFromApi } from '../utils/api-utils';
import UserContext from '../context/user-context';
import { createTokenData } from '../utils/wallet-utils';
import { useApiRequest } from './use-api-request.hook';

export const useWallet = () => {
  const { user } = useContext(UserContext);
  const apiRequest = useApiRequest();

  const [walletInfo, setWalletInfo] = useState({})
  const [userBalance, setUserBalance] = useState({});
  const [tokensRows, setTokensRows] = useState([]);
  const [currency, setCurrency] = useState("RUB")

  const fetchWalletInfo = useCallback(async (currency) => {
    try {
      const res = await apiRequest(getWalletFromApi, currency);
      setUserBalance(res.assets);
      setWalletInfo(res)
    } catch (error) {
      console.log(error)
    }
  }, [apiRequest])

  useEffect(() => {
    if (user && user.accessToken) {
      fetchWalletInfo(currency);
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
