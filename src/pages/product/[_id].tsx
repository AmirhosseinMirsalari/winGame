import { Box, Container, Grid, Typography } from "@mui/material";
import { teamTitleStyle } from "components/Product/styles";
import { Tabs, ProductDetails, ShareProduct } from "components/Product";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ProductItem from "components/Home/Products/Components/ProductItem/ProductItem";
import { useGetAllProductsQuery, useGetProductQuery } from "redux/products/productsApi";
import Loading from "components/Loading/Loading";
import { useRouter } from "next/router";
import Head from "next/head";

const Product = () => {
  const router:any = useRouter();


  const { data: productData, isLoading: productLoading, isError: productError } = useGetProductQuery(router.query._id);
  const { data: productsData, isLoading: productsLoading, isError: productsError } = useGetAllProductsQuery("");

  const product = productData?.data!;
  const products = productsData?.data ?? [];

  if (productLoading || productsLoading || productError ||productsError) {
    return <Loading full />;
  }

  return (
    <Box bgcolor={"white"}>
      <Head>
        <title>{product?.title}</title>
      </Head>
      <Breadcrumbs title={`محصول ${product?.title}`} lastPath={product?.title} category={product?.category} />
      <Container maxWidth={"lg"}>
        <ProductDetails product={product} />
        <Tabs product={product} />
        <ShareProduct />

        <Box sx={{ textAlign: "left", pb: 8 }}>
          <Typography variant="h4" sx={teamTitleStyle}>
            محصولات مرتبط
          </Typography>
          <Grid container spacing={{ xs: 1, md: 2 }}>
            {products.slice(0, 4).map((product) => (
              <Grid item xs={6} sm={4} md={3} key={product._id}>
                <ProductItem product={product} listView={false} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Product;
