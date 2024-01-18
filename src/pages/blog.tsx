import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ArticleCard,
  RecentComments,
  RecentPosts,
  SearchBar,
} from "components/Blog";
import CustomBreadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import Pagination from "components/Pagination/Pagination";
import ArticlePlaceholder from "components/Placeholders/ArticlePlaceholder";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import http from "utils/services/httpServices";

function Blog({ articlesData, articlesDataRecent, reviewsData }: any) {
  const [searchValue, setSearchValue] = useState("");
  const [articlesPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const articles = articlesData?.articles ?? [];
  const articlesLength = articlesData?.total ?? 0;
  const router = useRouter();
  
  return (
    <Box bgcolor={"white"}>
      <Head>
        <title>وین گیم | بلاگ</title>
      </Head>
      <CustomBreadcrumbs title={"بلاگ آموزشی"} />
      <Container>
        <Grid container sx={{ py: 6.25 }} spacing={3}>
          <Grid item xs={12} md={8.5}>
            <Grid
              sx={{
                ml: "15px",
                "& .search-bar": { padding: 0, border: "none" },
              }}
            >
              {!matches && (
                <SearchBar
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              )}
            </Grid>
            <Grid container spacing={4}>
              {!articlesData.isLoading && !articlesData.isError
                ? articles.map((article: any) => (
                    <ArticleCard
                      key={article._id!}
                      id={article._id!}
                      title={article.title}
                      image={article.image}
                      writer={article.writer}
                      createdAt={article.createdAt!}
                      category={article.category}
                    />
                  ))
                : Array(6)
                    .fill(null)
                    .map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <ArticlePlaceholder />
                      </Grid>
                    ))}
            </Grid>
            <Grid container>
              {!articles.length && (
                <Typography sx={{ marginTop: "20px" }}>
                  محتوایی یافت نشد!
                  <Box sx={{ margin: "2.2rem 0" }}>
                    <Button
                      onClick={() => {
                        setSearchValue("");
                        router.push("/blog");
                      }}
                      variant="contained"
                      sx={{ borderRadius: "6px" }}
                    >
                      مشاهده مقالات
                    </Button>
                  </Box>
                </Typography>
              )}
            </Grid>
            {matches && articles && (
              <Pagination
                productsPerPage={articlesPerPage}
                totalProducts={articlesLength}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </Grid>
          <Grid item xs={12} md={3.5}>
            <Grid>
              {matches && (
                <SearchBar
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              )}
              <RecentPosts articlesDataRecent={articlesDataRecent} />
              <RecentComments reviewsData={reviewsData} />
            </Grid>
            {!matches && articles && (
              <Pagination
                productsPerPage={articlesPerPage}
                totalProducts={articlesLength}
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

export default Blog;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { category } = query;
  const page = query.page || 1;
  const limit = 6;
  const search = query.search || "";

  let queryParams = `page=${page}&limit=${limit}&search=${search}`;

  if (category) {
    queryParams += `&category=${category}`;
  }

  try {
    const { data } = await http.get(`/articles?${queryParams}`);
    const { data: recentPosts } = await http.get(
      `/articles?page=1&limit=4&sort=latest`
    );

    const { data: reviewsData } = await http.get(
      "/articles/reviews?page=0%20&limit=4"
    );
console.log(data);

    return {
      props: {
        articlesData: {
          articles: data?.data || [],
          total: data?.total || 0,
          isLoading: false, // Set loading state here if needed
          isError: false, // Set error state here if needed
        },
        articlesDataRecent: {
          articlesRecent: recentPosts?.data || [],
          total: recentPosts?.total || 0,
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
    console.log(error);
    
    return {
      props: {
        articlesData: {
          articles: [],
          total: 0,
          isLoading: false,
          isError: true, // Set error state if request fails
        },
        articlesDataRecent: {
          articlesRecent: [],
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
