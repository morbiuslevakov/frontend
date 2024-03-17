import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { ReactComponent as ExitIcon } from '../../images/menu/exit.svg'
import UserContext from '../../context/user-context';
import { headerMenu } from '../../utils/constants/header';

export const MobileMenu = () => {
  const { user, logout } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const toggleDrawer = (value) => () => {
    setOpen(value);
  };

  const handleLogout = () => {
    logout()
    navigate("/login");
    window.location.reload()
  }

  const menuList = (
    <Box sx={{ width: 250 }} py={2} height={'100%'} role="presentation" onClick={toggleDrawer(false)} bgcolor={'#151515'}>
      <Stack justifyContent={'space-between'} height={'100%'}>
        <Box>
          <Typography px={2} pb={1} fontWeight={500}>Меню</Typography>
          <Divider sx={{ backgroundColor: 'white', mx: 2 }} />
          <List>
            <Stack gap={1} pt={1}>
              {headerMenu.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton sx={{ paddingY: 0 }} onClick={() => { navigate(item.path) }}>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </Stack>
          </List>
        </Box>
        <ListItem disablePadding>
          <ListItemButton sx={{ paddingY: 0 }} onClick={handleLogout}>
            <ListItemIcon>
              <ExitIcon />
            </ListItemIcon>
            <ListItemText primary={'Выход'} />
          </ListItemButton>
        </ListItem>
      </Stack>
    </Box>
  )

  return user ? <>
    <Stack justifyContent={'center'}>
      <IconButton onClick={toggleDrawer(true)} color="primary">
        <MenuIcon fontSize="large" />
      </IconButton>
    </Stack>
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} >
      {menuList}
    </Drawer>
  </> : null
}
