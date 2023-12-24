import React from 'react'
import { ErrorBox } from './Styled'

export const FormError = ({ isError, errorMessage }) => {
  return isError ? (
    <ErrorBox>{errorMessage}</ErrorBox>
  ) : null
}
