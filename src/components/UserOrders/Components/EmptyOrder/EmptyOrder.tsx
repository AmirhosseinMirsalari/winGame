import { EmptyWishlistWrapper } from "../../../EmptyList/styles";
import { Box, Typography } from "@mui/material";

const EmptyOrder = () => {
  return (
    <EmptyWishlistWrapper>
      <Box
        component="img"
        src="https://www.digikala.com/statics/img/svg/profile/order-empty.svg"
        alt="empty"
        className="itemImg"
      />
      <Typography sx={{ fontWeight: "400", fontSize: "17px" }}>
        تا کنون هیچ سفارشی ثبت نکرده اید
      </Typography>
    </EmptyWishlistWrapper>
  );
};

export default EmptyOrder;
