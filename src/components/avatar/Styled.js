import { Avatar, styled } from "@mui/material";

export const UserAvatar = styled(Avatar)({
  textTransform: "uppercase",
})

export const LargeUserAvatar = styled(Avatar)({
  width: "180px",
  height: "180px",
  fontSize: "60px",
  "@media(max-width: 600px)": {
    width: "100px",
    height: "100px",
    fontSize: "30px",
  }
})

export const SmallUserAvatar = styled(Avatar)({
  width: "30px",
  height: "30px",
  fontSize: "16px"
})

