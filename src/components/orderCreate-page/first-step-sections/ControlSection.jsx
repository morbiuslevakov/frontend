import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { ControlSectionText, FormContentWrapper, FormSectionWrapper, FormStack } from '../Styled'

export const ControlSection = ({ orderAction, buyHandler, sellHandler }) => {
  return (
    <FormSectionWrapper>
      <FormContentWrapper>
        <FormStack>
          <Typography>Я хочу</Typography>
          <Stack flexDirection={'row'} gap={1}>
            <Button onClick={buyHandler}>
              <ControlSectionText active={String(orderAction === "Купить")}>Купить</ControlSectionText>
            </Button>
            <Button onClick={sellHandler}>
              <ControlSectionText active={String(orderAction === "Продать")}>Продать</ControlSectionText>
            </Button>
          </Stack>
        </FormStack>
      </FormContentWrapper>
    </FormSectionWrapper>
  )
}
