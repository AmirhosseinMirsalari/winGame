import { Box, Typography } from "@mui/material";
import { Item, ShopMenuButton } from "../../styles";

function ShopMenuCard() {
  return (
    <Item>
      <Box
        sx={{
          position: "relative",
          "&:hover": {
            "& .bg-box": {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
            "& .pc-img": {
              transform: "scale(1.12)",
            },
          },
        }}
      >
        <Box
          sx={{
            height: { md: "260px", lg: "290px" },
            img: {
              width: "100%",
              height: "100%",
              transition: "all 800ms ease-in-out",
            },
            overflow: "hidden",
          }}
        >
          <img
            src="https://www.technolife.ir/wp-content/uploads/2022/03/ps5-vs-ps4.jpg"
            alt="gaming-pc"
            className="pc-img"
            style={{borderRadius:"20px"}}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            left: "0",
            bottom: "0",
            padding: "20px ",
            textAlign: "left",
            transition: "all 800ms ease-in",
          }}
          className="bg-box"
        >
          <Typography
            variant="h4"
            fontWeight={500}
            color={"white"}
            textTransform={"capitalize"}
            sx={{ fontSize: { md: "25px", lg: "35px" }, textAlign: "center"}}
          >
            خرید انواع کنسول های بازی
          </Typography>
          <ShopMenuButton href="/shop">مشاهده فروشگاه</ShopMenuButton>
        </Box>
      </Box>
    </Item>
  );
}

export default ShopMenuCard;
