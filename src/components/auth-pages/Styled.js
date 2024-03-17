import { Box, Button, OutlinedInput, Stack, styled } from "@mui/material"
import { DefaultCard } from "../card-wrappers/Styled"

export const Wrapper = styled(Stack)({
  alignItems: "center",
})

export const ErrorBox = styled(Box)({
  backgroundColor: "#2c0b0e",
  color: "#ea868f",
  border: '1px solid #842029',
  padding: '5px 10px',
  borderRadius: "5px"
})

export const SubmitButton = styled(Button)({
  textTransform: "capitalize",
  width: '100%',
  backgroundColor: "#667dea",
  height: "48px",
  "&:hover": {
    backgroundColor: "#764ba2"
  },
})

export const CardContent = styled(Stack)({
  padding: '20px',
  alignItems: "center",
})

export const CustomFormCard = styled(DefaultCard)({
  width: '60%',
  "@media(max-width: 900px)": {
    width: '100%'
  }
})

export const CustomInput = styled(OutlinedInput)({
  color: "#FFF",
  backgroundColor: "#1e1e1e",
  width: '100%',
  "& .Mui-disabled": {
    backgroundColor: "#3a3838"
  }
})

export const PageContent = styled(Stack)({
  maxWidth: '1100px',
  width: '100%',
  gap: '20px',
  justifyContent: 'space-between',
  alignItems: "center",
  flexDirection: 'row'
})


export const FormWrapper = styled("form")({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '14px 0'
});
