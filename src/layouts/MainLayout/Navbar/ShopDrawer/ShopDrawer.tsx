import { CloseRounded } from "@mui/icons-material";
import { Box, Button, Divider, Drawer, List, Typography } from "@mui/material";
import { useAppSelector } from "redux/store";
import { useGetAllCartItemQuery } from "redux/cart/cartApi";
import ShopCartItem from "../ShopCart/ShopCartItem/ShopCartItem";
import { getSubtotal } from "utils/getSubtotal";
import { useRouter } from "next/router";

type Anchor = "left" | "right";
type ShopDrawerProps = {
  displayDrawer: { right: boolean; left: boolean };
  toggleDrawer: (anchor: Anchor, open: boolean) => () => void;
};

function ShopDrawer({ displayDrawer, toggleDrawer }: ShopDrawerProps) {
  const { user } = useAppSelector((state) => state.reducer.auth);
  const { cartList } = useAppSelector((state) => state.reducer.cart);


  const navigate = useRouter();

  const { data: cartData } = useGetAllCartItemQuery(undefined, { skip: !!!user });
  const cart = cartData?.data?.products ?? [];

  const cartItems = user ? cart : cartList;

  const subtotal = getSubtotal(cartItems);

  return (
    <Drawer anchor="right" open={displayDrawer["right"]} onClose={toggleDrawer("right", false)}>
      <Box padding={2} position={"relative"}>
        <Box position={"absolute"} right={4} top={6} sx={{ cursor: "pointer" }} onClick={toggleDrawer("right", false)}>
          <CloseRounded fontSize="large" color="secondary" />
        </Box>
        <Box textAlign={"center"} marginBottom={2}>
          <Typography variant="h6" color="primary" fontWeight={600}>
            سبد خرید
          </Typography>
          <Divider
            sx={{
              width: "40px",
              marginX: "auto",
              marginTop: "10px",
              borderBottomWidth: "2px",
            }}
          />
        </Box>
        <Divider />
        <List sx={{ maxHeight: "68vh", overflow: "auto" }}>
          {cartItems?.map((item) => (
            <ShopCartItem
              key={item?._id}
              id={item?._id}
              name={item?.name}
              price={item?.price}
              quantity={item?.quantity}
              image={item?.productId?.image ?? ""}
              productId={item?.productId?._id ?? ""}
            />
          ))}
          <Divider />
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "13px",
          }}
        >
          <Typography variant="subtitle2" color={"secondary"} fontWeight={400}>
            مجموع سبد خرید:
          </Typography>
          <Typography variant="subtitle2" color={"primary"}>
            {subtotal}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            paddingY: "20px",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            fullWidth={true}
            color="error"
            sx={{
              "&:hover": { backgroundColor: "#333333" },
              whiteSpace:"nowrap"
            }}
            onClick={() => {
              toggleDrawer("right", false)();
              navigate.push("/cart");
            }}
          >
           سبد خرید
          </Button>
          <Button sx={{whiteSpace:"nowrap",padding:"0 30px"}} variant="contained" fullWidth={true} onClick={()=>{!user ? navigate.push("/?login=open") : navigate.push("/checkout")  }}>
            {!user ? "ورود و " : ""} تسویه حساب
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default ShopDrawer;
