import { CloseRounded } from "@mui/icons-material";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { removeFromCart } from "redux/cart/cartSlice";
import { shopCartCloseIcon } from "../../styles";
import Link from "next/link";
import { useAppSelector } from "redux/store";
import { useDeleteFromCartMutation } from "redux/cart/cartApi";

interface Props {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  productId: string;
}
function ShopCartItem({ id, name, price, quantity, image, productId }: Props) {
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.reducer.auth);
  const [deleteFromCart] = useDeleteFromCartMutation();

  const deleteCartHandler = async () => {
    if (user) {
      try {
        const res = await deleteFromCart(id).unwrap();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <ListItem
      disableGutters
      sx={{ img: { objectFit: "contain", aspectRatio: "1" } }}
    >
      <ListItemIcon>
        <Box onClick={deleteCartHandler}>
          <CloseRounded sx={shopCartCloseIcon} />
        </Box>
      </ListItemIcon>

      <ListItemText sx={{ marginLeft: "16px", marginLeft: "40px" }}>
        <Link href={`/product/${productId}`}>
          <Typography
            variant="body2"
            color={"primary"}
            sx={{ textDecoration: "none", textAlign: "start" }}
          >
            {name}
          </Typography>
        </Link>

        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Typography
            variant="subtitle1"
            sx={{ textDecoration: "none", textAlign: "start" }}
            color={"secondary"}
          >
            {quantity} x
          </Typography>
          <Typography
            variant="body2"
            sx={{ textDecoration: "none", textAlign: "start" }}
            color={"primary"}
          >
            {price.toFixed(2)}
          </Typography>
        </Box>
      </ListItemText>
      <Link href={`/product/${productId}`}>
        <img src={image} alt="product" width={75} height={75} />
      </Link>
    </ListItem>
  );
}

export default ShopCartItem;
