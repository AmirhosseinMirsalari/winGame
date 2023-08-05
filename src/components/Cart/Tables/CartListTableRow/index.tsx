import { Box, Button, TableRow, useMediaQuery, useTheme } from "@mui/material";
import { closeButtonStyles, ImageBox, StyledTableCell } from "../../styles";
import CloseIcon from "@mui/icons-material/Close";
import QuantityInput from "../../QuantityInput/QuantityInput";
import { ICartItem } from "types/cart";
import { useDispatch } from "react-redux";
import { removeFromCart } from "redux/cart/cartSlice";
import { useDeleteFromCartMutation } from "redux/cart/cartApi";
import { useAppSelector } from "redux/store";
import Link from "next/link";

type Props = {
  cartItem: ICartItem;
};

const CartListTableRow = ({ cartItem }: Props) => {
  const { user } = useAppSelector((state) => state.reducer.auth);

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const [deleteFromCart] = useDeleteFromCartMutation();

  const deleteCartHandler = async () => {
    if (user) {
      try {
        const res = await deleteFromCart(cartItem?._id).unwrap();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(removeFromCart(cartItem?._id));
    }
  };
  return (
    <TableRow key={cartItem._id}>
      {!matchesSm && (
        <StyledTableCell sx={{margin:"100px"}} align="left">
          <Button onClick={deleteCartHandler} sx={closeButtonStyles}>
            <CloseIcon sx={{ fontSize: "inherit", color: "#333333" }} />
          </Button>
        </StyledTableCell>
      )}
      <StyledTableCell align="left">
        <ImageBox>
          <Link href={`/product/${cartItem.productId._id}`}>
            <img style={{width:"100px"}} alt={cartItem?.name} src={cartItem?.productId.image} />
          </Link>
          {matchesSm && (
            <Box onClick={deleteCartHandler}>
              <CloseIcon sx={{ fontSize: "28px", color: "#333333", }} />
            </Box>
          )}
        </ImageBox>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        scope="cartItem"
        sx={{ a: { textDecoration: "none", color: "common.digitaBlack" } }}
      >
        <span>نام محصول</span>
        <Link href={`/product/${cartItem.productId._id}`}>{cartItem?.name}</Link>
      </StyledTableCell>
      <StyledTableCell sx={{ color: "#f03637" }} align="left">
        <span>قیمت</span>{cartItem?.price} تومان
      </StyledTableCell>
      <StyledTableCell align="center">
        <span>تغییر تعداد</span>
        {cartItem?.productId?.quantity > 1 ? (
          <Box height={"50px"}>
            <QuantityInput cartItem={cartItem} />
          </Box>
        ) : (
          cartItem?.quantity
        )}
      </StyledTableCell>
      <StyledTableCell align="right" sx={{ color: "#f03637",marginBottom:"20px" }}>
        {(cartItem?.quantity * +cartItem.price)}
        <span>تعداد</span>
      </StyledTableCell>
    </TableRow>
  );
};

export default CartListTableRow;
