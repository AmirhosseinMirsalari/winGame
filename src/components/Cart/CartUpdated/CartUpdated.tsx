import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { ICartItem } from "types/cart";

export enum UpdateType {
  Remove = 1,
  Update,
}

type Props = {
  item?: ICartItem;
  type?: UpdateType;
  setCartUpdated: React.Dispatch<React.SetStateAction<any | null>>;
};

const CartUpdated = ({ item, type, setCartUpdated }: Props) => {
  const handleUndo = () => {
    setCartUpdated(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px 15px",
        margin: "0 0 30px",
        border: "1px solid #ddd",
      }}
    >
      <CheckIcon
        sx={{
          fontSize: "0.9rem",
          marginRight: "10px",
          color: "#ddd",
        }}
      />
      <Typography
        sx={{
          fontSize: "14px",
          color: "#777",
        }}
      >
        {type === UpdateType.Remove ? `${` حذف شد“${item?.productId}“`}` : "سبد خرید آپدیت شد"}
      </Typography>
      {type === UpdateType.Remove && <Box sx={{ marginLeft: "auto" }}></Box>}
    </Box>
  );
};

export default CartUpdated;
