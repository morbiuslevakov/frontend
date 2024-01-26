import React from 'react'
import { Stack } from '@mui/material'
import { FormContentWrapper } from './Styled'
import { CustomTextarea } from './comment-step-section/CustomTextarea'
import { CommentWarning } from './comment-step-section/CommentWarning'

export const CommentStep = ({ states, setState }) => {
  return (
    <Stack>
      <FormContentWrapper>
        <CustomTextarea value={states.comment} setValue={setState.comment} />
      </FormContentWrapper>
      <CommentWarning />
    </Stack>
  )
}
