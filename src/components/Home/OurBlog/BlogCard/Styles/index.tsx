import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Card = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "relative",
  img: {
    maxWidth: "100%",
    borderRadius: "20px",
    height: "auto",
    aspectRatio: "1.4",
    objectFit: "cover",
  },
}));
export const textStyle = { fontSize: "15px", color: "#777777",margin:" 10px 0" };
export const iconStyle = {
  fontSize: "1rem",
  marginRight: "5px",
  color: "#777777",
};
