import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { ProfileCard } from './Styled'
import { ChangePassword } from './ChangePassword'
import { useMediaQueryHook } from "../../hooks/use-media-query.hook";

export const Security = () => {
  const isMobile = useMediaQueryHook('sm')
  const width = isMobile ? '100%' : "300px"

  return (
    <ProfileCard>
      <Stack gap={2}>
        <Typography fontSize={26} lineHeight={1}>Безопасность</Typography>
        <Stack gap={1} width={width}>
          <ChangePassword />
          <Button variant="outlined" disabled>Включить F2A</Button>
        </Stack>
      </Stack>
    </ProfileCard>
  )
}
