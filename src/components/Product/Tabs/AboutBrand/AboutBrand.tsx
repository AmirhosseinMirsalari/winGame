import { Typography, Box } from "@mui/material";
import { TabsTitrStyle, ProductContentStyle, ProductTextStyle } from "../../styles";

const AboutBrand = ({ brand }: { brand: string }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={ProductContentStyle}>
        <Typography variant="body2" component="p" sx={ProductTextStyle}>
          این برند یکی از معروف ترین برند های سازنده  محصولات دیجیتال است که مورد تایید بسیار زیادی از مشتریان هم بوده است
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutBrand;
