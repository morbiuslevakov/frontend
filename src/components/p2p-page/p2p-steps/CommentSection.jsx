import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { FormContentWrapper, FormSectionWrapper } from '../../orderCreate-page/Styled'

export const CommentSection = ({ comment }) => {
  return comment ? (
    <Box py={1}>
      <FormSectionWrapper>
        <FormContentWrapper>
          <Stack gap={2}>
            <Stack flexDirection={'row'} gap={1}>
              <ChatBubbleOutlineRoundedIcon color='primary' />
              <Stack gap={1}>
                <Typography variant='gray' fontSize={12}>Комментарий</Typography>
                <Typography>{comment}</Typography>
              </Stack>
            </Stack>
            <Stack alignItems={'center'} flexDirection={'row'} gap={1}>
              <WarningRoundedIcon color='yellow' />
              <Typography variant='gray' fontSize={12}>Только мошенники предлагают общение и проведение сделок вне P2P Маркета</Typography>
            </Stack>
          </Stack>
        </FormContentWrapper>
      </FormSectionWrapper>
    </Box>
  ) : <></>
}
