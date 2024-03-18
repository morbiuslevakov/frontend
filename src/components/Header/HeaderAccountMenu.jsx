import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, MenuItem, Typography } from '@mui/material'
import { headerAccountMenuItems, headerMenuSlotProps } from '../../utils/constants/header'
import UserContext from '../../context/user-context'

export const HeaderAccountMenu = ({ anchor, handleCloseMenu }) => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate()

  const handleClick = (path) => {
    if (path === 'logout') {
      logout()
      navigate("/login");
      window.location.reload()
    }
    navigate(path)
    handleCloseMenu()
  }

  return (
    <Menu
      id="header-menu"
      anchorEl={anchor}
      slotProps={headerMenuSlotProps}
      open={Boolean(anchor)}
      onClose={handleCloseMenu}
    >
      {headerAccountMenuItems?.map((item, index) => {
        return <MenuItem key={index} onClick={() => handleClick(item.path)}>
          {item.icon}
          <Typography pl={2} variant='lightGray'>{item.text}</Typography>
        </MenuItem>
      })}
    </Menu>
  )
}
