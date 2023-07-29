import { Box, Grid, Typography } from "@mui/material";
import { shopMenuItems } from "../../data";
import { ShopSubTitle } from "../../styles";

function ShopMenuCategories() {
  return (
    <Grid container>
      <Grid item xs={6} paddingLeft={1}>
        <Typography
          textTransform={"uppercase"}
          color="primary"
          fontWeight={600}
        >
          محصولات جدید
        </Typography>
        <Box marginTop={2}>
          {shopMenuItems.map((item) => (
            <ShopSubTitle key={item.id}>{item.name}</ShopSubTitle>
          ))}
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        paddingLeft={1}
      >
        <Box>
          <Typography
            textTransform={"uppercase"}
            color="primary"
            fontWeight={600}
          >
            پرفروش های هفته
          </Typography>
          <Box marginTop={2}>
            {shopMenuItems.slice(5, 9).map((item) => (
              <ShopSubTitle key={item.id}>{item.name}</ShopSubTitle>
            ))}
          </Box>
        </Box>
        <Box>
          <Typography
            textTransform={"uppercase"}
            color="primary"
            fontWeight={600}
          >
            پرفروش های ماه
          </Typography>
          <Box marginTop={2}>
            {shopMenuItems.slice(6, 9).map((item) => (
              <ShopSubTitle key={item.id}>{item.name}</ShopSubTitle>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ShopMenuCategories;
