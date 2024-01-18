import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { posterStyle } from "components/About/styles";
import { ArticleDescription, ReplyForm } from "components/Article";
import { articleTitleStyles } from "components/Article/styles";
import RecentComments from "components/Blog/SideBar/RecentComments/RecentComments";
import RecentPosts from "components/Blog/SideBar/RecentPosts/RecentPosts";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import Loading from "components/Loading/Loading";
import Review from "components/Product/Tabs/Reviews/Review/Review";
import OpenLoginContext from "context/openLogin";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { useLoadReviews } from "hooks/useLoadReviews";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import { useAddReviewMutation } from "redux/reviews/reviewsApi";
import { useAppSelector } from "redux/store";
import { getReadableDate } from "utils/getReadableDate";
import http from "utils/services/httpServices";

function Article({ articlesDataRecent, getArticle, reviewsData }: any) {
  const { user } = useAppSelector((state) => state.reducer.auth);
  const [reviewDescription, setReviewDescription] = useState("");
  const router: any = useRouter();

  const { openLogin, setOpenLogin } = useContext(OpenLoginContext);

  const [addReview] = useAddReviewMutation();

  const { title, writer, image, category, description, createdAt } =
    getArticle?.articleDetail || {};

  const date = getReadableDate(createdAt || "");

  const reviews = reviewsData?.reviews ?? [];

  const { indexOfLoadedReviews, loadMoreReviewsHandler } =
    useLoadReviews(reviews);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!user) {
      setOpenLogin(true);
      return;
    }
    try {
      let response = await addReview({
        path: "articles",
        id: router.query._id,
        review: {
          rating: 5,
          description: reviewDescription,
        },
      }).unwrap();

      if (response.code === 200) {
        setReviewDescription("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (getArticle.isLoading || getArticle.isError) {
    return <Loading full />;
  }

  const contentState = convertFromRaw(JSON.parse(description || ""));
  const editorState = EditorState.createWithContent(contentState);
  return (
    <Box bgcolor={"white"}>
      <Head>
        <title>{title}</title>
      </Head>
      <Breadcrumbs title={"بلاگ آموزشی"} lastPath={title} category={category} />
      <Container>
        <Grid container sx={{ py: 6.25 }}>
          <Grid item md={8.5}>
            <Grid container px={"15px"} mb={"35px"}>
              <Typography variant="h2" component="h2" sx={articleTitleStyles}>
                {title}
              </Typography>
              <Grid container sx={{ mb: "20px" }}>
                <ArticleDescription
                  author={String(writer)}
                  category={String(category)}
                  date={String(date)}
                />
              </Grid>
              <Box
                component="img"
                sx={posterStyle}
                src={image}
                height="600px"
                maxWidth={"820px"}
                maxHeight={"600px"}
                marginBottom={"20px"}
              />
              <Typography color={"#f03637"} mb={"20px"}>
                در خدمت شما هستیم با یکی دیگر از مقالات آموزشی وین گیم! با ما
                همراه باشید
              </Typography>
              <Box sx={{ textAlign: "justify", lineHeight: "30px" }}>
                <Editor
                  editorState={editorState}
                  readOnly
                  onChange={() => {}}
                />
              </Box>

              <Divider sx={{ width: "100%", margin: "35px 0" }} />
              {/* comments */}
              <Box width={"100%"}>
                <Typography fontWeight={500} marginBottom={4} variant="h6">
                  کامنت ها
                </Typography>
                {reviews?.length !== 0 ? (
                  reviews
                    ?.slice(0, indexOfLoadedReviews)
                    .map((review: any) => (
                      <Review
                        id={review._id!}
                        userId={review.userId}
                        rating={review.rating!}
                        description={review.description}
                        createdAt={review.createdAt!}
                        key={review._id}
                      />
                    ))
                ) : (
                  <Box>
                    <Typography
                      component="p"
                      sx={{
                        color: "common.digitaGrey3",
                        fontSize: "16px",
                      }}
                    >
                      هنوز هیچ کسی نظری ثبت نکرده است
                    </Typography>
                    <Divider sx={{ width: "100%" }} />
                  </Box>
                )}
                {reviews.length > 6 && (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ display: "block", margin: "10px 0 0 auto" }}
                    onClick={loadMoreReviewsHandler}
                  >
                    {indexOfLoadedReviews < reviews.length
                      ? "بارگذاری بیشتر"
                      : "بستن"}
                  </Button>
                )}
              </Box>
              <Box width={"100%"} id="reviews" marginTop={4}>
                <Typography fontWeight={500} marginBottom={4} variant="h6">
                  ارسال کامنت
                </Typography>
                <form onSubmit={submitHandler}>
                  <ReplyForm
                    user={user}
                    reviewDescription={reviewDescription}
                    setReviewDescription={setReviewDescription}
                  />
                </form>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3.5}>
            <Grid sx={{ ml: "15px" }}>
              <RecentPosts articlesDataRecent={articlesDataRecent} />
              <RecentComments reviewsData={reviewsData} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Article;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { _id } = query;
  try {
    const { data: recentPosts } = await http.get(
      `/articles?page=1&limit=4&sort=latest`
    );

    const { data: articleDetail } = await http.get(`articles/find/${_id}`);

    const { data: reviewsData } = await http.get(`/articles/reviews?${_id}`);

    return {
      props: {
        articlesDataRecent: {
          articlesRecent: recentPosts?.data || [],
          total: recentPosts?.total || 0,
          isLoading: false, // Set loading state here if needed
          isError: false, // Set error state here if needed
        },
        getArticle: {
          articleDetail: articleDetail?.data || [],
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
    return {
      props: {
        articlesDataRecent: {
          articlesRecent: [],
          total: 0,
          isLoading: false, // Set loading state here if needed
          isError: true, // Set error state here if needed
        },
        getArticle: {
          articleDetail: [],
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
