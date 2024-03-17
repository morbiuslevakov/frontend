import { Button, InputLabel, Modal, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { CustomInput } from '../auth-pages/Styled'
import { FormError } from '../auth-pages/FormError'
import { changePasswordApi } from '../../utils/api-utils'
import { DefaultModal } from '../card-wrappers/Styled'

export const ChangePassword = () => { // Никита этот код пиздец грязный. но пока нет времени. Потом надо буде чистить уже не в спешке перед релизом. Это обязателньо
  const [isChanging, setIsChanging] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [fa, setFa] = useState('')
  const [is2FA, setIs2FA] = useState(false)
  const [error, setError] = useState('')

  const handleChangePassword = async () => {
    const data = {
      "oldPassword": oldPassword,
      "newPassword": newPassword,
      "totpCode": fa
    }
    changePasswordApi(data).then(() => {
      setIsOpen(true)
      setIsChanging(false)
    }).catch((err) => {
      if (error === "2FA required") {
        setIs2FA(true)
      }
      setError(err)
    })
  }

  const handleOldPassword = (event) => {
    setOldPassword(event.target.value)
  }

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value)
  }

  const handleFa = (event) => {
    setFa(event.target.value)
  }

  const handleClose = () => {
    window.location.reload()
  }

  const handleOpenForm = () => {
    setIsChanging(true)
  }

  if (isChanging) {
    return <Stack gap={2}>
      <FormError isError={!!error} errorMessage={error} />
      <Stack gap={1}>
        <InputLabel>Старый пароль</InputLabel>
        <CustomInput size="lg" type="text" value={oldPassword} onChange={handleOldPassword} placeholder="Старый пароль" />
      </Stack>
      <Stack gap={1}>
        <InputLabel>Новый пароль</InputLabel>
        <CustomInput size="lg" type="text" value={newPassword} onChange={handleNewPassword} placeholder="Новый пароль" />
      </Stack>
      {
        is2FA && <Stack gap={1}>
          <InputLabel>2FA Код</InputLabel>
          <CustomInput size="lg" type="text" value={fa} onChange={handleFa} placeholder="2FA код" />
        </Stack>
      }
      <Button variant='contained' color='aqua' onClick={handleChangePassword} disabled={!(oldPassword && newPassword)}>Сохранить</Button>
    </Stack>
  }

  return (
    <>
      <Modal open={isOpen} onClose={handleClose} >
        <DefaultModal>
          <Stack gap={3}>
            <Typography fontSize={22} textAlign={'center'}>
              Пароль успешно изменен
            </Typography>
            <Button fullWidth variant="contained" color='blue' onClick={handleClose}>Закрыть</Button>
          </Stack>
        </DefaultModal>
      </Modal>
      <Button variant="outlined" onClick={handleOpenForm}>Изменить пароль</Button>
    </>
  )
}
