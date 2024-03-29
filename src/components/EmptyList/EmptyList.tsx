import { Box, Typography } from "@mui/material";
import { EmptyWishlistWrapper } from "./styles";

interface T {
  title: string;
  image: string;
}

const EmptyList = ({ title, image }: T) => {
  return (
    <EmptyWishlistWrapper>
      <Box component="img" src={image} alt="empty" className="itemImg" />
      <Typography sx={{ fontWeight: "400", fontSize: "17px",marginTop:"5px" }}>
         مقدار {title}  خالی است
      </Typography>
    </EmptyWishlistWrapper>
  );
};

export default EmptyList;
