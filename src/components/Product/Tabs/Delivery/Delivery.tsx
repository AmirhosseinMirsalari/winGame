import { Typography, Box } from "@mui/material";
import { TabsTitrStyle, ProductContentStyle, ProductTextStyle } from "../../styles";

const Delivery = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={ProductContentStyle}>
        <Typography variant="body2" component="p" sx={ProductTextStyle}>
         تمامی محصولات به وسیله پشت پیشتاز بین سه الی هفت روز به دست شما می رسد
        </Typography>

      </Box>
    </Box>
  );
};

export default Delivery;
