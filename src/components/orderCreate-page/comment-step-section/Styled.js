import { TextareaAutosize, styled } from "@mui/material";

export const TextArea = styled(TextareaAutosize)(({ theme }) => ({
  width: 'calc(100% - 40px)',
  resize: 'none',
  height: '400px',
  fontFamily: theme.typography.fontFamily,
  fontSize: '16px',
  padding: '20px',
  background: theme.palette.darkBackground.main,
  color: theme.palette.lightBrown.main,
  borderRadius: '10px',
  borderColor: theme.palette.lightBrown.main
}));