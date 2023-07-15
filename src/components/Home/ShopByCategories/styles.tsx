import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundAttachment: "fixed",
  backgroundImage: `url(https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1409.jpg?w=1060&t=st=1689437030~exp=1689437630~hmac=56362ffbef072f366af34e6642d557b90b7f4b8376be45b025f8664f290e6b4e)`,
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  padding: "175px 0 130px",
  [theme.breakpoints.up("sm")]: {
    padding: "175px 0 205px",
  },
  display: "flex",
  justifyContent: "center",
  ".loading": {
    alignSelf: "center",
    marginBottom: "45px",
  },
  "&.slideInFromBottom": {
    animation: `slideInFromBottom 1000ms ${theme.transitions.easing.easeInOut}`,
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  fontSize: "32px",
  fontWeight: 600,
  textAlign: "center",
  textTransform: "uppercase",
  marginBottom: "12px",
}));

export const boxStyles = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const Card = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "relative",
  cursor: "pointer",
  img: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "30px",
  },
}));
