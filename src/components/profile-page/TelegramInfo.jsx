import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'

export const TelegramInfo = ({ user, userDetails }) => {
    console.log(userDetails)
    const telegramId = userDetails.tgId

    const telegramLink = `https://t.me/DeaslideNotificationsBot?start=${user.id}`

    if (telegramId) {
        return <Box>
            <Typography variant="lightGray" fontWeight={600} fontSize={14} lineHeight={1}>Telegram:</Typography>
            <Typography >@{telegramId}</Typography>
        </Box>
    }

    return <Stack gap={1}>
        <Typography variant="lightGray" fontWeight={600} fontSize={14} lineHeight={1}>Telegram:</Typography>
        <Box>
            <Button target='_blank' color='aqua' variant="contained" href={telegramLink}>ПРИВЯЗАТЬ</Button>
        </Box>
    </Stack>
}
