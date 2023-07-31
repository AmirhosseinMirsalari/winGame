import {
  Box,
  CardContent,
  Button,
  Card,
  CardMedia,
  Typography,
  Modal,
} from "@mui/material";

import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { cartModal } from "../../PanelProducts/styles";
import { titleWrapper, titleStyle } from "../../PanelProducts/styles";
import { cardWrapper, deleteBtn, addBtn } from "../../../../styles/user";
import { useDeleteWishMutation } from "redux/wishlist/wishlistApi";
import { successMessage } from "utils/toastMessages";
import { useAppSelector } from "redux/store";
import { useAddToCart } from "hooks/useAddToCart";
import CartModal from "components/Home/Products/Components/Modals/CartModal/CartModal";
import { isInList } from "utils/isInList";
import { useGetAllCartItemQuery } from "redux/cart/cartApi";


const Product = ({ product }: any) => {
  const [open, setOpen] = useState(false);
  const { role,user } = useAppSelector((state) => state.reducer.auth);
  const { cartList } = useAppSelector((state) => state.reducer.cart);

  const [openCart, setOpenCart] = useState(false);
  const [deleteWish, { isLoading }] = useDeleteWishMutation();

  const { data: cartData } = useGetAllCartItemQuery(undefined, {
    skip: !!!user,
  });
  const cart = cartData?.data?.products ?? [];
  const cartItems = user ? cart : cartList;
  const inCart = isInList(cartItems, product._id!);
  const { addToCartHandler } = useAddToCart(inCart, product, setOpenCart);

  async function handleRemove(id: string) {
    try {
      const response = await deleteWish({ path: role!, id }).unwrap();
      if (response.code !== 200) {
        throw new Error(response?.message);
      }
      console.log(response);
      successMessage("از لیست علاقه مندی های شما پاک شد");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Card sx={cardWrapper}>
      <CardMedia
        component="img"
        image={product.image}
        alt="green iguana"
        sx={{ aspectRatio: "1", objectFit: "contain" }}
      />
      <CardContent sx={titleWrapper}>
        <Typography component="p" sx={titleStyle}>
          {product.title}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ pt: "2px", fontSize: "16px" }}
        >
          {product.price + "هزار تومان"}
        </Typography>
        <Box sx={{ display: "flex", mt: 1, gap: 1 }}>
          <Button
            variant="contained"
            sx={deleteBtn}
            onClick={() => setOpen(true)}
          >
            <DeleteForeverIcon sx={{ margin: "0 0.2rem" }} />
            حذف
          </Button>
          <Button onClick={addToCartHandler} variant="contained" sx={!inCart ? addBtn : {...addBtn , backgroundColor:"#333333", color:"white"}}>
            <ShoppingCartIcon className="addIcon" />
            {!inCart ? "افزودن به سبد خرید" : "موجود در سبد خرید"}
          </Button>
        </Box>

        <Modal
          open={openCart}
          onClose={() => setOpenCart(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <CartModal cartItems={cartItems} setOpenCart={setOpenCart} />
          </div>
        </Modal>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={cartModal}>
            <DeleteForeverIcon
              sx={{ fontSize: 110, fontWeight: 100, color: "#f03637", p: 2 }}
            />
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              این آیتم حذف شود؟
            </Typography>
            <Box sx={{ display: "flex", gap: 3, margin: "1rem 0" }}>
              <Button
                variant="contained"
                sx={{
                  p: "0.8rem 2.2rem",
                  borderRadius: "4px",
                  fontSize: "15px",
                  height: "46px",
                }}
                onClick={() => setOpen(false)}
              >
                لغو
              </Button>
              <Button
                onClick={() => handleRemove(product._id)}
                variant="contained"
                sx={{
                  p: "0.8rem 2.2rem",
                  background: "#f03637",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                  fontSize: "12px",
                  height: "46px",
                  "&:hover": { background: "#333" },
                }}
              >
                حذف کردن
              </Button>
            </Box>
          </Box>
        </Modal>
      </CardContent>
    </Card>
  );
};

export default Product;
