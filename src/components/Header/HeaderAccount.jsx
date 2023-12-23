import React, { useState } from 'react'
import { Avatar, Button, IconButton, Tooltip } from '@mui/material'
import { HeaderAccountMenu } from './HeaderAccountMenu';
import { useNavigate } from 'react-router-dom';

export const HeaderAccount = ({ isLogged }) => {
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
      <Tooltip title="Account menu">
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar alt="user-avatar" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/4486ff4d-dbb8-40e7-99cb-a1754950f281/220x330" />
        </IconButton>
      </Tooltip>
      <HeaderAccountMenu anchor={anchorEl} handleCloseMenu={handleCloseMenu} />
    </>
  )
}
