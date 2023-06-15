import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  "&:hover .swiper-button-next": {
    opacity: "1",
  },
  "&:hover .swiper-button-prev": {
    opacity: "1",
  },
  ".swiper-slide img": {
    width: "100%",
  },
  ".swiper-pagination-bullet": {
    background: "white",
    opacity: 1,
    margin: "10px!important",
  },
  ".swiper-horizontal>.swiper-pagination-bullets": {
    bottom: "170px",
    [theme.breakpoints.down("sm")]: {
      bottom: "70px",
    },
  },
  ".swiper-pagination-bullet-active": {
    position: "relative",
    "&::before": {
      animation: "spin-dot 2s linear infinite",
      top: "-110%",
      left: "-110%",
      borderRadius: "50%",
      position: "absolute",
      content: '""',
      width: "22px",
      height: "22px",
      borderRight: " 2px solid white",
      borderLeft: "2px solid transparent",
      borderTop: "2px solid white",
      borderBottom: "2px solid white",
    },
  },
  ".swiper-button-next,.swiper-button-prev": {
    opacity: "0",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    width: "43px",
    height: "43px",
    "&::after": {
      backgroundSize: "contain",
      opacity: "0.3",
      width: "24px",
      height: "24px",
      content: '""',
    },
    "&:hover": {
      border: "1px solid rgba(255, 255, 255, 1)",
      "&:after": {
        opacity: "1",
      },
    },
  },
  ".swiper-button-next": {
    transform: " scale(-1, 1)",
  },
  "@keyframes spin-dot": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  ".slide1": {
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  },
  ".slide2": {
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  },
}));

export const SlideItem = styled(Box)(({ theme }) => ({
  position: "relative",
  color: "#ffffff",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    height: "530px",
  },
  [theme.breakpoints.up("sm")]: {
    height: "700px",
  },
  [theme.breakpoints.up("md")]: {
    height: "867px",
  },
  ".header": {
    [theme.breakpoints.down("sm")]: {
      top: "12%",
    },
    [theme.breakpoints.down("md")]: {
      top: "12%",
      maxWidth: "100%",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "80%",
    },
    position: "absolute",
    top: "22%",
    left: "10%",
    animation: `fadeIn 3000ms ${theme.transitions.easing.easeInOut}`,
    "&-title": {
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "18px",
      },
      fontWeight: 500,
      textTransform: "uppercase",
      display: "flex",
      alignItems: "center",
      height: "68px",
      "&::before": {
        content: '""',
        bottom: "11px",
        width: "40px",
        backgroundColor: "#ffffff",
        height: "2px",
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: "10px",
      },
    },
    "&-subtitle": {
      fontFamily: '"iranyekan", Sans-serif',
      color: "#FFFFFF",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        fontSize: "28px",

      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "50px",
      },
      fontWeight: "600",
      lineHeight: "1em",
    },
    "&-desc": {
      // marginBottom: "38px",
      // marginRight:"20%",
      // marginTop:"50px",
      textAlign: "center",
      fontFamily: '"iranyekan", Sans-serif',
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "22px",
      },
      fontWeight: 500,
      lineHeight: "24px",
    },
  },
  ".animatedBox": {
    animation: `fadeIn 1000ms ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
      transform: "translateY(200%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

export const ShopNowBtn = styled(Button)(({ theme }) => ({
  fontFamily: '"iranyekan", Sans-serif',
  fontSize: "15px",
  [theme.breakpoints.up("sm")]: {
    marginRight:"40%",
  },
  marginRight:"30%",
  fontWeight: 600,
  textTransform: "capitalize",
  marginTop:"25px",
  borderWidth: "0px",
  borderRadius: "100%",
  color: "#333333",
  backgroundColor: "#FFFFFF",
  borderColor: "#333333",
  padding: "14px 50px",
  "&:hover": {
    color: "#FFFFFF",
  },
}));
