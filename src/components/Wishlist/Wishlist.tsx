import { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { wrapper } from "../../../styles/user";
import { paginationStyle } from "../PanelProducts/styles";
import Product from "./Product/Product";
import Pagination from "../Pagination/Pagination";
import { ArrowBack } from "@mui/icons-material";
import { useGetWishlistQuery } from "redux/wishlist/wishlistApi";
import { useAppSelector } from "redux/store";
import { ErrorText } from "../../../styles/panel";
import PanelLoading from "../Loading/PanelLoading";
import NotFound from "../EmptyList/NotFound";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

const Wishlist = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const { role } = useAppSelector((state) => state.reducer.auth);
  const { asPath } = useRouter();

  const gridSize = asPath.includes("user") ? 6 : 4;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const { data: wishlistData, isLoading, isError } = useGetWishlistQuery(role!);
  const wishlist = wishlistData?.data ?? [];

  return (
    <Box sx={wrapper}>
      <Head>
        <title>وین گیم | علاقه مندی ها</title>
      </Head>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Link href="/user">
          <Box
            sx={{
              display: { md: "none" },
              textDecoration: "none",
              color: "common.digitaBlack",
            }}
          >
            <ArrowBack />
          </Box>
        </Link>

        <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
          علاقه مندی ها
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {isLoading && <PanelLoading />}

        {isError && <ErrorText>ERROR:Could not retrieve data!</ErrorText>}

        {wishlist.length === 0 && !isLoading && !isError && (
          <NotFound message="لیست علاقه مندی ها شما خالی است" />
        )}

        {wishlist.length !== 0 &&
          !isLoading &&
          !isError &&
          wishlist
            .slice(indexOfFirstProduct, indexOfLastProduct)
            .map((product) => (
              <Grid item xs={12} sm={6} md={gridSize} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Grid>
            ))}
      </Grid>
      {wishlist.length > productsPerPage && (
        <Box sx={paginationStyle}>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={wishlist.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Box>
      )}
    </Box>
  );
};

export default Wishlist;
