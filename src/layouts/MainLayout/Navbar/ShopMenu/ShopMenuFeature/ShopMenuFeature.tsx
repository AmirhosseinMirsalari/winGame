import { Fragment } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { shopMenuCategories } from "../../data";
import { ShopSubTitle } from "../../styles";
import { useRouter } from "next/router";

function ShopMenuFeature() {
  const navigate = useRouter();

  const clickHandler = (name: string) => () => {
    const query = name.replaceAll(" ", "+").replaceAll("&", "%26");
    navigate.push({
      pathname: `/shop`,
      search: `?category=%2F${query}`,
    });
  };
  return (
    <Fragment>
      <Typography
        textTransform={"uppercase"}
        color="primary"
        fontWeight={600}
        sx={{ marginLeft: "10%", marginBottom: "15px" }}
      >
        دسته بندی های پرطرفدار
      </Typography>
      <Grid container>
        {shopMenuCategories.map((item) => (
          <Grid key={item.id} item xs={4} marginBottom={1}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                img: { width: { md: "80px", lg: "100px" }, cursor: "pointer" },

                marginBottom: "5px",
              }}
              onClick={clickHandler(item.name)}
            >
              <img src={`${item.img}`} alt="category-img" />
            </Box>

            <ShopSubTitle
              sx={{
                textAlign: "center",
                width: "70%",
                margin: "auto",
                lineHeight: "1.2",
                cursor: "pointer",
              }}
              onClick={clickHandler(item.name)}
            >
              {item.name}
            </ShopSubTitle>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
}

export default ShopMenuFeature;
