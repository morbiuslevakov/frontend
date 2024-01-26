import { useEffect, useState } from 'react'
import { useApiRequest } from './use-api-request.hook';
import { getCryptoFromApi } from '../utils/api-utils';

export const useCrypto = (currency) => {
  const apiRequest = useApiRequest();
  const [cryptoDetails, setCryptoDetails] = useState([])
  const [cryptoNames, setCryptoNames] = useState([])

  useEffect(() => {
    apiRequest(getCryptoFromApi, currency).then((res) => {
      setCryptoDetails(res)
    }).catch(error => { console.log(error) })
  }, [currency, apiRequest])

  useEffect(() => {
    const formattedCrypto = cryptoDetails.map(crypto => crypto.asset)
    setCryptoNames(formattedCrypto)
  }, [cryptoDetails])


  return { cryptoDetails, cryptoNames }
}
