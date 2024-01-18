import { Box, Container, Grid, Typography } from "@mui/material";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ProductItem from "components/Home/Products/Components/ProductItem/ProductItem";
import Loading from "components/Loading/Loading";
import { ProductDetails, ShareProduct, Tabs } from "components/Product";
import { teamTitleStyle } from "components/Product/styles";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import http from "utils/services/httpServices";

const Product = ({ productsData, productData,reviewsData }: any) => {
  const router: any = useRouter();

  const product = productData?.product!;
  const products = productsData?.products ?? [];

  if (
    productData.isLoading ||
    productsData.isLoading ||
    productData.isError ||
    productsData.isError
  ) {
    return <Loading full />;
  }

  return (
    <Box bgcolor={"white"}>
      <Head>
        <title>{product?.title}</title>
      </Head>
      <Breadcrumbs
        title={`محصول ${product?.title}`}
        lastPath={product?.title}
        category={product?.category}
      />
      <Container maxWidth={"lg"}>
        <ProductDetails product={product} reviewsData={reviewsData} />
        <Tabs product={product} />
        <ShareProduct />

        <Box sx={{ textAlign: "left", pb: 8 }}>
          <Typography variant="h4" sx={teamTitleStyle}>
            محصولات مرتبط
          </Typography>
          <Grid container spacing={{ xs: 1, md: 2 }}>
            {products.map((product: any) => (
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { _id }: any = query;

  try {
    const { data: productsData } = await http.get(`/products?limit=4`);
    const { data: productData } = await http.get(`/products/find/${_id}`);
    const { data: reviewsData } = await http.get(`/products/reviews?${_id}`);

    return {
      props: {
        productsData: {
          products: productsData?.data || [],
          total: productsData?.total || 0,
          isLoading: false, // Set loading state here if needed
          isError: false, // Set error state here if needed
        },
        productData: {
          product: productData?.data || {},
          total: productData?.total || 0,
          isLoading: false, // Set loading state here if needed
          isError: false, // Set error state here if needed
        },
        reviewsData: {
          reviews: reviewsData?.data || [],
          total: reviewsData?.total || 0,
          isLoading: false, // Set loading state here if needed
          isError: false, // Set error state here if needed
        },
      },
    };
  } catch (error) {
    return {
      props: {
        productsData: {
          products: [],
          total: 0,
          isLoading: false, // Set loading state here if needed
          isError: true, // Set error state here if needed
        },
        productData: {
          product: {},
          total: 0,
          isLoading: false, // Set loading state here if needed
          isError: true, // Set error state here if needed
        },
        reviewsData: {
          reviews: [],
          total: 0,
          isLoading: false,
          isError: true, // Set error state if request fails
        },

      },
    };
  }
}
