import { Box, Button, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CompareWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  height: "90%",
  width: "90%",
  maxWidth: "1536px",
  "& .close-button": {
    backgroundColor: "transparent",
    position: "absolute",
    top: "14px",
    right: "28px",
    display: "flex",
    cursor: "pointer",
    zIndex: "1111",
    [theme.breakpoints.down("sm")]: {
      top: "7px",
      right: "18px",
    },
    
    "& .MuiSvgIcon-root": {
      color: "white",
      fontSize: "28px",
    },
  },
  "& .title": {
    padding: "8px 0",
    backgroundColor: theme.palette.common.digitaRed,
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      width: "105%",
    },
    textAlign: "center",
    color: "white",
    h2: {
      fontSize: "26px",
      fontWeight: 600,
      [theme.breakpoints.down("sm")]: {
        fontSize: "18px",
      },
    },
  },
}));

export const CompareIndex = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid #e2e2e2`,
  padding: "10px",
  span: {
    fontWeight: 600,
  },
}));
export const CTHCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.digitaGrey8,
  border: "1px solid #e7e7e7",
  color: theme.palette.common.digitaBlack,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    padding: "6px",
  },
  textTransform: "uppercase",
  borderBottom: "none",
}));
export const CTCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.digitaGrey7,
  textAlign: "center",
  color: theme.palette.common.digitaGrey3,
  border: "1px solid #e7e7e7",
  borderBottom: "none",
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    padding: "6px",
  },
  "&.bold": {
    fontWeight: 600,
  },
}));
export const CTButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.digitaRed,
  textWrap: "nowrap",
  borderRadius:"12px",
  textAlign: "center",
  color: "white",
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
    padding: "6px",
  },
  "&:hover": {
    backgroundColor: theme.palette.common.digitaBlack,
  },
}));

export const tableImageStyles = {
  maxWidth: "160px",
  maxHeight: "160px",
  margin: "auto",
  background: "white",
  padding: "3px",
  border: "1px solid #DADADA",
  img: {
    width: "100%",
    aspectRatio: "1",
    objectFit: "contain",
  },
};

export const tableRemoveBtnStyles = {
  display: "inline-flex",
  cursor: "pointer",
  alignItems: "center",
  "&:hover ": {
    color: "common.digitaBlack",
    "& .MuiSvgIcon-root": {
      color: "white",
      backgroundColor: "common.digitaRed",
      borderRadius: "50%",
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: "15px",
    color: "common.digitaRed",
    marginLeft: "4px",
  },
};

export const compareTableStyles = {
  "&.w-2": {
    td: {
      width: "50%",
    },
  },
  "&.w-3": {
    td: {
      width: "33%",
    },
  },
  "&.w-4": {
    td: {
      width: "25%",
    },
  },
};
