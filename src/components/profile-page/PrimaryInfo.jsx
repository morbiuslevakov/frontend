import React, { useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { ProfileCard } from './Styled'
import { CustomInput } from "../../components/auth-pages/Styled";
import { CopyButton } from '../p2p-page/orderDeal/CopyButton';
import { TelegramInfo } from './TelegramInfo';
import { changeUsernameApi } from '../../utils/api-utils';

export const PrimaryInfo = ({ user, userDetails }) => {
  const [username, setUsername] = useState(user.username)

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handleSaveUsername = async () => {
    changeUsernameApi(username).then(res => {
      console.log(res)
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <ProfileCard>
      <Stack gap={2}>
        <Stack gap={2}>
          <Typography fontSize={26} lineHeight={1}>Основные</Typography>
          <Stack gap={1}>
            <Typography variant="lightGray" fontWeight={600} fontSize={14} lineHeight={1}>Имя пользователя:</Typography>
            <Box width={300}>
              <CustomInput size="lg" type="text" value={username} onChange={handleUsername} placeholder="Username" disabled />
            </Box>
          </Stack>
          <Box>
            <Typography variant="lightGray" fontWeight={600} fontSize={14} lineHeight={1}>Адрес:</Typography>
            <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
              <Typography>{user.address}</Typography>
              <CopyButton text={user.address} />
            </Stack>
          </Box>
          <Box>
            <Typography variant="lightGray" fontWeight={600} fontSize={14} lineHeight={1}>Email:</Typography>
            <Typography >{user.email}</Typography>
          </Box>
          <TelegramInfo user={user} userDetails={userDetails} />
        </Stack>
        {user.username !== username && <Stack alignItems={'end'}>
          <Button color='aqua' variant="contained" onClick={handleSaveUsername}>Сохранить изменения</Button>
        </Stack>}
      </Stack>
    </ProfileCard>
  )
}
