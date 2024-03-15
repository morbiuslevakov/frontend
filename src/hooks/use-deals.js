import { useEffect, useState } from 'react'
import { getUserDealsFromApi } from '../utils/api-utils'

export const useDeals = () => {
  const [deals, setDeals] = useState([])

  useEffect(() => {
    const fetchDeals = async () => {
      const dealsFromApi = await getUserDealsFromApi()
      return dealsFromApi
    }
    fetchDeals().then(res => {
      setDeals(res)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return { deals }
}
