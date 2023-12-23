import { Link } from "react-router-dom";
import { styled } from "@mui/material";

export const HeaderWrapper = styled('header')({
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '10px 16px',
  background: "#1D262C",
  zIndex: 100
})

export const LogoWrapper = styled('div')({
  cursor: "pointer"
})

export const HeaderMenuItem = styled(Link)({
  cursor: "pointer",
  "&:hover": {
    opacity: 0.7
  }
})
