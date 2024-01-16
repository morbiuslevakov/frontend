import { Link } from "react-router-dom";
import { Box, styled } from "@mui/material";

export const HeaderWrapper = styled('header')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  backgroundColor: theme.palette.dark.main,
  zIndex: 100
}))

export const LogoWrapper = styled(Box)({
  cursor: "pointer"
})

export const HeaderMenuItem = styled(Link)({
  cursor: "pointer",
  "&:hover": {
    opacity: 0.7
  }
})

export const Container = styled(Box)({
  padding: '10px 16px',
  width: '100%'
})
