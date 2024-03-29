import {
  Box,
  Container,
  Fade,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import ProductItem from "components/Home/Products/Components/ProductItem/ProductItem";
import Pagination from "components/Pagination/Pagination";
import ProductPlaceholder from "components/Placeholders/ProductPlaceholder";
import {
  CategoriesFilter,
  ColorFilter,
  FiltersDrawer,
  PriceFilter,
  Toolbar,
} from "components/Shop";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import http from "utils/services/httpServices";

function Shop({ allproductsData }: any) {
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState({
    grid: true,
    list: false,
  });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const router = useRouter();
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  // Create a new instance of URLSearchParams with the current search query
  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);

  let queries: any = `page=${currentPage}&limit=${productsPerPage}`;

  let searchQueryParams = searchParams.get("search");
  if (searchQueryParams) {
    queries = `${queries} &search=${searchQueryParams}`;
  }

  let categoryQueryParams = searchParams.get("category");
  if (categoryQueryParams) {
    queries = `${queries} &category=${categoryQueryParams.replaceAll(
      "&",
      "%26"
    )}`;
  }

  let colorQueryParams = searchParams.get("color");
  if (colorQueryParams) {
    queries = `${queries} &color=${colorQueryParams}`;
  }

  let priceQueryParams = searchParams.get("price");
  if (priceQueryParams) {
    queries = `${queries} &price=${priceQueryParams}`;
  }

  let sortQueryParams = searchParams.get("sort");
  if (sortQueryParams) {
    queries = `${queries} &sort=${sortQueryParams}`;
  }

  const toggleDrawer = (open: boolean) => {
    setDisplayDrawer(open);
  };

  const products = allproductsData?.products ?? [];
  const productsLength = allproductsData?.total ?? 0;
  console.log(allproductsData);

  const addQueryParams = (filter: string, name: string) => () => {
    let selectedQueryParams = searchParams.get(filter);
    let firstCatParams = selectedQueryParams?.split("/").length === 2;

    if (selectedQueryParams?.includes(name) && !firstCatParams) {
      searchParams.set(
        filter,
        `${selectedQueryParams.replace(`/${name}`, "")}`
      );
    } else if (selectedQueryParams?.includes(name) && firstCatParams) {
      searchParams.delete(filter);
    } else {
      searchParams.set(
        filter,
        selectedQueryParams ? `${selectedQueryParams}/${name}` : `/${name}`
      );
    }
    // Update the URLSearchParams with the updated search query
    router.push(`/shop?${searchParams.toString()}`, undefined, {
      shallow: false,
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    window.scroll({
      top: 200,
      left: 0,
      behavior: "smooth",
    });
  }, [router.asPath]);

  return (
    <Box bgcolor={"white"}>
      <Head>
        <title>وین گیم | فروشگاه</title>
      </Head>
      <Breadcrumbs title={"فروشگاه"} />
      <Container sx={{ paddingY: "50px" }}>
        <Grid container columnSpacing={4}>
          {matches && (
            <Grid item xs={3.5}>
              <CategoriesFilter
                addQueryParams={addQueryParams}
                categoryQueryParams={categoryQueryParams}
              />
              <ColorFilter drawer={true} addQueryParams={addQueryParams} />
              <PriceFilter drawer={true} />
            </Grid>
          )}
          {!matches && (
            <FiltersDrawer
              displayDrawer={displayDrawer}
              categoryQueryParams={categoryQueryParams}
              toggleDrawer={toggleDrawer}
              addQueryParams={addQueryParams}
            />
          )}
          <Grid item xs={12} md={8.5}>
            <Toolbar
              matches={matches}
              toggleDrawer={toggleDrawer}
              setSelectedLayout={setSelectedLayout}
              selectedLayout={selectedLayout}
              sortQueryParams={sortQueryParams}
              productsPerPage={productsPerPage}
              setProductsPerPage={setProductsPerPage}
            />
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {products
                ? products.map((product: any, index: number) => {
                    if (products.length === 0) {
                      return (
                        <Box
                          key={index}
                          sx={{ textAlign: "center", margin: "40px auto" }}
                        >
                          <Typography
                            variant="h5"
                            sx={{ color: "common.digitaBlack" }}
                          >
                            نتیجه ای یافت نشد
                          </Typography>
                        </Box>
                      );
                    }
                    return (
                      <Fragment key={product._id}>
                        {selectedLayout.grid && (
                          <Fade in={selectedLayout.grid}>
                            <Grid item xs={12} sm={4} key={product._id}>
                              <ProductItem product={product} listView={false} />
                            </Grid>
                          </Fade>
                        )}
                        {selectedLayout.list && (
                          <Fade in={selectedLayout.list}>
                            <Grid item xs={12}>
                              <ProductItem product={product} listView={true} />
                            </Grid>
                          </Fade>
                        )}
                      </Fragment>
                    );
                  })
                : Array(12)
                    .fill(null)
                    .map((item, index) => (
                      <Grid item xs={12} sm={4} key={index}>
                        <ProductPlaceholder />
                      </Grid>
                    ))}
            </Grid>
            {products && (
              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={productsLength}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Shop;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { category, color, price, sort }: any = query;
  const limit = query.limit || 12;
  const page = query.page || 1;
  const search = query.search || "";

  let queryParams = `page=${page}&limit=${limit}&search=${search}`;

  if (category) {
    queryParams += `&category=${category.replace(/ /g, "%20")}`;
  }
  if (color) {
    queryParams += `&color=${color.replace(/ /g, "%20")}`;
  }
  if (price) {
    queryParams += `&price=${price.replace(/ /g, "%20")}`;
  }
  if (sort) {
    queryParams += `&sort=${sort.replace(/ /g, "%20")}`;
  }

  console.log(queryParams);

  try {
    const { data: products } = await http.get(`/products?${queryParams}`);
    return {
      props: {
        allproductsData: {
          products: products?.data || [],
          total: products?.total || 0,
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
      },
    };
  }
}
