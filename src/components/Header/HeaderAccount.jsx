import React, { useState } from 'react'
import { Button, IconButton, Tooltip } from '@mui/material'
import { HeaderAccountMenu } from './HeaderAccountMenu';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../avatar/Avatar'

export const HeaderAccount = ({ isLogged, user }) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    navigate('/register')
  }

  if (!isLogged) {
    return <Button variant="outlined" onClick={handleClick}>Регистрация</Button>
  }

  return (
    <>
      <Tooltip title="Профиль">
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar username={user.username} />
        </IconButton>
      </Tooltip>
      <HeaderAccountMenu anchor={anchorEl} handleCloseMenu={handleCloseMenu} />
    </>
  )
}
