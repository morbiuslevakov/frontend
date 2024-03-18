import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormContentWrapper, FormWrapper, PageContent, Wrapper } from '../../components/orderCreate-page/Styled'
import { getUserOrders } from '../../utils/api-utils'
import { OrderItem } from '../../components/orders-page/OrderItem';
import { useCrypto } from '../../hooks/use-crypto.hook';
import { useApiRequest } from '../../hooks/use-api-request.hook';

export const Orders = () => {
  const navigate = useNavigate()
  const apiRequest = useApiRequest();
  const { cryptoDetails } = useCrypto("RUB")
  const [userOrders, setUserOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const myOrders = await getUserOrders()
      return myOrders
    }
    apiRequest(fetchOrders).then(res => {
      setUserOrders(res)
    }).catch((error) => {
      console.log(error)
    })
  }, [apiRequest])

  const handleBack = () => {
    navigate('/p2p')
  }

  return <Wrapper>
    <PageContent>
      <FormWrapper>
        <FormContentWrapper>
          <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
            <IconButton color="primary" onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography>Мои объявления</Typography>
          </Stack>
        </FormContentWrapper>
        <Stack gap={1}>
          {userOrders.map(order => {
            return <OrderItem order={order} rates={cryptoDetails} key={order.orderId} />
          })}
          {userOrders.length === 0 && <FormContentWrapper><Typography>У вас пока нет открытых объявлений</Typography></FormContentWrapper>}
        </Stack>
      </FormWrapper>
    </PageContent>
  </Wrapper >
}
