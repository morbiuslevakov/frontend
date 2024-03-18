import { useEffect, useState } from 'react'
import { getUserDealsFromApi } from '../utils/api-utils'
import { useApiRequest } from './use-api-request.hook';

export const useDeals = () => {
  const apiRequest = useApiRequest();
  const [deals, setDeals] = useState([])

  useEffect(() => {
    const fetchDeals = async () => {
      const dealsFromApi = await getUserDealsFromApi()
      return dealsFromApi
    }
    apiRequest(fetchDeals).then(res => {
      setDeals(res)
    }).catch(error => {
      console.log(error)
    })
  }, [apiRequest])

  return { deals }
}