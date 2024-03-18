import { Box, NativeSelect, Stack, TextField, Typography, styled } from "@mui/material";

export const Wrapper = styled(Stack)({
  flexDirection: 'column',
  alignItems: 'center',
})

export const PageContent = styled(Box)({
  maxWidth: '1000px',
  width: '100%'
})

export const FormWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.dark.main,
  borderRadius: "10px",
  overflow: "hidden",
  "@media(max-width: 650px)": {
    height: 'calc(100vh - 74px)'
  }
}))

export const FormSectionWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}))

export const FormSectionClickWrapper = styled(FormSectionWrapper)({
  cursor: 'pointer',
  "&:hover": {
    opacity: 0.8
  }
})

export const FormContentWrapper = styled(Box)({
  padding: "10px 30px",
  "@media(max-width: 650px)": {
    padding: "10px 20px",
  }
})

export const FormStack = styled(Stack)({
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center"
})

export const FormInput = styled(TextField)(({ theme }) => ({
  input: {
    color: theme.palette.primary.main,
  },
  'input::placeholder': {
    color: theme.palette.lightGray.main,
  },
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    WebkitAppearance: 'none',
    margin: 0,
  }
}))

export const FormSelect = styled(NativeSelect)(({ theme }) => ({
  color: theme.palette.blue.main,
  fontWeight: 600,
  "select:focus": {
    backgroundColor: 'transparent',
  },
  "select": {
    paddingRight: '0 !important',
    paddingLeft: "10px",
    textAlign: "end",
  },
  option: {
    backgroundColor: `${theme.palette.secondary.main} !important`,
  },
  svg: {
    display: "none"
  }
}))

export const OrderActionWrapper = styled(Box)(({ theme }) => ({
  padding: "5px 10px",
  backgroundColor: theme.palette.dark.main,
  borderRadius: "5px"
}))

export const CurrencyWrapper = styled(Box)({
  cursor: 'pointer'
})

export const ControlSectionText = styled(Typography)(({ theme, active }) => ({
  color: active === "true" ? theme.palette.blue.main : theme.palette.gray.main,
  fontWeight: 600,
  "&::after": {
    content: '""',
    display: active === "true" ? "block" : "none",
    height: "3px",
    backgroundColor: theme.palette.blue.main,
    position: "absolute",
    bottom: 2,
    left: '5%',
    width: "90%",
  }
}))
