import { Box, styled } from "@mui/material";

export const DefaultCard = styled(Box)({
  background: "#2D2E2F",
  borderRadius: "16px",
})

export const DefaultModal = styled(DefaultCard)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  padding: "24px"
})
