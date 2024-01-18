import { Box, Container, Grid } from "@mui/material";
import SpecialProductPlaceholder from "components/Placeholders/SpecialProductPlaceholder";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useGetAllCartItemQuery } from "redux/cart/cartApi";
import { useAppSelector } from "redux/store";
import SpecialHeader from "./Components/Header/SpecialHeader";
import SpecialItem from "./Components/SpecialItem/SpecialItem";
import SupportItems from "./Components/SupportItems/SupportItems";

const Special = ({ productsLatest, productsRating }: any) => {
  const { user } = useAppSelector((state) => state.reducer.auth);
  const { cartList } = useAppSelector((state) => state.reducer.cart);

  const [selectedSorting, setSelectedSorting] = useState("latest");

  const { ref, inView } = useInView({ triggerOnce: true });
  const productsLatests = productsLatest?.productsLatestData ?? [];
  const productsRatings = productsRating?.productsRatingData ?? [];

  const { data: cartData } = useGetAllCartItemQuery(undefined, {
    skip: !!!user,
  });
  const cart = cartData?.data?.products ?? [];
  const cartItems = user ? cart : cartList;

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        position: "relative",
        backgroundColor: "white",
        marginY: { xs: "-45px", sm: "-120px" },
        width: "96%",
        zIndex: "10",
      }}
      ref={ref}
    >
      <Container
        maxWidth={"lg"}
        sx={{
          overflow: "hidden",
          paddingY: "20px",
          animation: (theme) =>
            inView
              ? `slideInFromBottom 1000ms ${theme.transitions.easing.easeInOut}`
              : "",
        }}
      >
        <SpecialHeader
          selectedSorting={selectedSorting}
          setSelectedSorting={setSelectedSorting}
        />

        <Box>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {!productsLatest.isLoading &&
              !productsLatest.isError &&
              selectedSorting === "latest" &&
              productsLatests.map((item: any) => (
                <SpecialItem
                  key={item?._id!}
                  product={item}
                  cartItems={cartItems}
                />
              ))}
            {!productsRating.isLoading &&
              !productsRating.isError &&
              selectedSorting === "rating" &&
              productsRatings.map((item: any) => (
                <SpecialItem
                  key={item?._id!}
                  product={item}
                  cartItems={cartItems}
                />
              ))}

            {!productsLatests ||
              (!productsRatings &&
                Array(9)
                  .fill(null)
                  .map((item, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      lg={4}
                      sx={{ height: "150px" }}
                      key={index}
                    >
                      <SpecialProductPlaceholder />
                    </Grid>
                  )))}
          </Grid>
        </Box>
        <SupportItems />
      </Container>
    </Container>
  );
};

export default Special;
