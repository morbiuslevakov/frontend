import { useEffect, useState } from 'react'
import { useBanks } from './use-banks.hook'
import { buildOrdersPayload } from '../utils/p2p-utils';
import { getOrders } from '../utils/api-utils';
import { useApiRequest } from './use-api-request.hook';
import { useCrypto } from './use-crypto.hook';

export const useP2PPage = (type) => {
  const apiRequest = useApiRequest();
  const [currency, setCurrency] = useState("RUB")
  const [crypto, setCrypto] = useState("YUSRA")
  const [selectedOrder, setSelectedOrder] = useState('')
  const [step, setStep] = useState(1)
  const [orders, setOrders] = useState([])
  // const [orderPage, setOrderPage] = useState(1)
  const orderPage = 1
  const [isLoading, setLoading] = useState(true)

  const { cryptoDetails } = useCrypto(currency)

  const { allBanks } = useBanks(currency)
  const [selectedBanks, setSelectedBanks] = useState(['All', ...allBanks.map(bank => bank.id)]);

  useEffect(() => {
    setLoading(true)
    const filteredBanks = selectedBanks.filter(bank => bank !== 'All');
    if (filteredBanks.length === 0) {
      setOrders([]);
      return;
    }
    const orderData = buildOrdersPayload(type, currency, crypto, filteredBanks)
    apiRequest(getOrders, orderData, orderPage).then(res => {
      setOrders(res)
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      setLoading(false)
    })
  }, [type, currency, crypto, selectedBanks, orderPage, apiRequest])

  useEffect(() => {
    if (allBanks.length > 0) {
      setSelectedBanks(['All', ...allBanks.map(bank => bank.id)]);
    }
  }, [allBanks]);

  const states = { currency, crypto, selectedBanks, selectedOrder, step, orders, type, isLoading, cryptoDetails }

  const setState = {
    currency: setCurrency,
    crypto: setCrypto,
    banks: setSelectedBanks,
    order: setSelectedOrder,
    step: setStep
  }

  return { states, setState }
}
