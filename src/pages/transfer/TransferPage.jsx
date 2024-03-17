import React, { useState } from 'react';
import { Stack, Button, InputLabel, Typography, Modal } from '@mui/material';
import { PageContent, Wrapper } from '../../components/wallet-page/Styled';
import { CustomInput } from '../../components/auth-pages/Styled';
import { useCrypto } from '../../hooks/use-crypto.hook'
import { ProfileCard } from '../../components/profile-page/Styled';
import { FormOption } from '../../components/p2p-page/options/FormOption';
import { useWallet } from '../../hooks/use-wallet.hook';
import { sendTokensApi } from '../../utils/api-utils';
import { DefaultModal } from '../../components/card-wrappers/Styled';
import { FormError } from '../../components/auth-pages/FormError';

export const TransferPage = () => {
  const { cryptoNames } = useCrypto("RUB")
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { tokensRows } = useWallet()
  const [address, setAddress] = useState('')
  const [crypto, setCrypto] = useState('YUSRA')
  const [amount, setAmount] = useState('')
  const token = tokensRows.find(row => row.name === crypto)
  const isDisable = !(Number(amount) > 0 && address)

  const handleAddress = (event) => {
    setAddress(event.target.value)
  }

  const handleChangeCrypto = (event) => {
    setCrypto(event.target.value)
  }

  const handleAmount = (event) => {
    const tokens = Number(event.target.value)
    if (tokens < token.amount) {
      setAmount(event.target.value)
    }
  }

  const handleMax = () => {
    setAmount(token?.amount)
  }

  const handleSendTokens = async () => {
    const data = {
      "address": address,
      "amount": String(amount),
      "assetId": "65f4021cf9fa3fbbece56d7f", // пока что айди усры 
      "feeAssetId": "65f4021cf9fa3fbbece56d7f" // пока что айди усры 
    }
    sendTokensApi(data).then(() => {
      setIsOpen(true)
    }).catch(error => {
      setError(error)
    })
  }

  const handleClose = () => {
    window.location.reload()
  }

  return (
    <>
      <Modal open={isOpen} onClose={handleClose} >
        <DefaultModal>
          <Stack gap={3}>
            <Typography fontSize={22} textAlign={'center'}>
              Успешная транзакция!
            </Typography>
            <Button fullWidth variant="contained" color='blue' onClick={handleClose}>Закрыть</Button>
          </Stack>
        </DefaultModal>
      </Modal>
      <Wrapper>
        <PageContent>
          <Stack gap={2}>
            <ProfileCard>
              <Stack direction="column" gap={2}>
                <FormError isError={!!error} errorMessage={error} />
                <Stack gap={2}>
                  <Stack gap={1}>
                    <InputLabel>Выберите токен</InputLabel>
                    <FormOption label={"Токен"} onChange={handleChangeCrypto} options={cryptoNames} value={'YUSRA'} setValue={''} width={'calc(100% - 20px)'} />
                  </Stack>
                  <Stack gap={1}>
                    <InputLabel>Введите адрес</InputLabel>
                    <CustomInput fullWidth placeholder="Адрес кошелька" value={address} onChange={handleAddress} />
                  </Stack>
                </Stack>
                <Stack>
                  <Typography>Введите количество</Typography>
                  <Stack gap={1}>
                    <InputLabel>
                      <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
                        <Typography variant='gray'>Доступно: {token?.amount} {token?.name}</Typography>
                        <Button onClick={handleMax}>МАКС.</Button>
                      </Stack>
                    </InputLabel>
                    <CustomInput fullWidth placeholder="Количество" value={amount} onChange={handleAmount} />
                  </Stack>
                  <Typography variant="gray" fontSize={14} pt={1}>
                    Комиссия за транзакцию 1 YUSRA
                  </Typography>
                </Stack>
              </Stack>
            </ProfileCard>
            <Button fullWidth variant="contained" color="aqua" onClick={handleSendTokens} disabled={isDisable}>
              Перевести
            </Button>
          </Stack>
        </PageContent>
      </Wrapper>
    </>
  );
};
