import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as HeaderAppIcon } from '../../images/header-logo.svg'
import { LogoWrapper } from './Styled'

export const HeaderLogo = () => {
  return (
    <LogoWrapper>
      <Link to={'/'}>
        <HeaderAppIcon />
      </Link>
    </LogoWrapper>
  )
}
