import React from 'react'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

export const ListDrawer = ({ items, isOpen, handleDrawer, handleSelect }) => {
  return <Drawer
    anchor={'right'}
    open={isOpen}
    onClose={handleDrawer}
    PaperProps={{ sx: { backgroundColor: "secondary.main" } }}
  >
    <Box width={200}>
      <List>
        {items?.map(item => {
          return <ListItem key={item} disablePadding onClick={() => {
            handleSelect(item)
          }}>
            <ListItemButton>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        })}
      </List>
    </Box>
  </Drawer>
}
