import React, { useState } from 'react'
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { InfoCard } from './Styled'

export const PrimaryInfo = ({ user }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(user.address)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  const tooltipText = copied ? "Скопировано" : "Скопировать адрес"

  const copyIcon = copied ? <DoneIcon fontSize='small' color='primary' /> : <ContentCopyIcon fontSize='small' color='primary' />

  return (
    <InfoCard>
      <Stack gap={2}>
        <Typography fontSize={26} lineHeight={1}>Основные</Typography>
        <Box>
          <Typography variant="lightGray" fontWeight={600} fontSize={14} lineHeight={1}>Адрес:</Typography>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <Typography>{user.address}</Typography>
            <Tooltip title={tooltipText}>
              <IconButton onClick={handleCopy}>
                {copyIcon}
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
        <Box>
          <Typography variant="lightGray" fontWeight={600} fontSize={14} lineHeight={1}>Email:</Typography>
          <Typography >{user.email}</Typography>
        </Box>
        <Box>
          <Typography variant="lightGray" fontWeight={600} fontSize={14} lineHeight={1}>Имя пользователя:</Typography>
          <Typography >{user.username}</Typography>
        </Box>
      </Stack>
    </InfoCard>
  )
}
