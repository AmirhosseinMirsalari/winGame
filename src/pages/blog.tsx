import { useState } from "react";
import Pagination from "components/Pagination/Pagination";
import { Box, Grid, useMediaQuery, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomBreadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import { useGetAllArticlesQuery } from "redux/articles/articlesApi";
import ArticlePlaceholder from "components/Placeholders/ArticlePlaceholder";
import { ArticleCard, RecentComments, RecentPosts, SearchBar } from "components/Blog";
import Head from "next/head";
import { useRouter } from "next/router";

function Blog() {
  const [searchValue, setSearchValue] = useState("");
  const [articlesPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter();
  const categoryQueryParams = router.query.category;

  let queries: any = `page=${currentPage}&limit=${articlesPerPage} &search=${searchValue}`;

   if (categoryQueryParams) {
    queries = `${queries} &category=${categoryQueryParams.replaceAll("&", "%26")}`;
  }

  const { data: articlesData, isLoading, isError } = useGetAllArticlesQuery(queries);
  const articles = articlesData?.data ?? [];
  const articlesLength = articlesData?.total ?? 0;

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
              {!matches && <SearchBar setSearchValue={setSearchValue} />}
            </Grid>
            <Grid container spacing={4}>
              {!isLoading && !isError
                ? articles.map((article) => (
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
              {matches && <SearchBar setSearchValue={setSearchValue} />}
              <RecentPosts />
              <RecentComments />
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
