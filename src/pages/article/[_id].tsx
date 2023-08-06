import { useState, FormEvent, useContext } from "react";
import { Container, Button, Box, Grid, Typography } from "@mui/material";
import RecentPosts from "components/Blog/SideBar/RecentPosts/RecentPosts";
import RecentComments from "components/Blog/SideBar/RecentComments/RecentComments";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import { posterStyle } from "components/About/styles";
import Divider from "@mui/material/Divider";
import { articleTitleStyles } from "components/Article/styles";
import { ReplyForm, ArticleDescription } from "components/Article";
import { useGetArticleQuery } from "redux/articles/articlesApi";
import Loading from "components/Loading/Loading";
import { getReadableDate } from "utils/getReadableDate";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import Review from "components/Product/Tabs/Reviews/Review/Review";
import {
  useAddReviewMutation,
  useGetReviewsQuery,
} from "redux/reviews/reviewsApi";
import { useLoadReviews } from "hooks/useLoadReviews";
import { useAppSelector } from "redux/store";
import { useRouter } from "next/router";
import Head from "next/head";
import OpenLoginContext from "context/openLogin";

function Article() {
  const { user } = useAppSelector((state) => state.reducer.auth);
  const [reviewDescription, setReviewDescription] = useState("");
  const router = useRouter();
  
  const { openLogin, setOpenLogin } = useContext(OpenLoginContext);

  const [addReview] = useAddReviewMutation();

  const {
    data: articleData,
    isLoading,
    isError,
  } = useGetArticleQuery(router.query._id);

  const { title, writer, image, category, description, createdAt } =
    articleData?.data || {};

  const date = getReadableDate(createdAt || "");

  const { data: reviewsData } = useGetReviewsQuery({
    path: "articles",
    id: router?.query?._id,
  });
  const reviews = reviewsData?.data ?? [];

  const { indexOfLoadedReviews, loadMoreReviewsHandler } =
    useLoadReviews(reviews);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!user) {
      setOpenLogin(true)
      // router.push({
      //   pathname: router.pathname,
      //   hash: 'reviews',
      //   search: 'login=open',
      // });
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

  if (isLoading || isError) {
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
                در خدمت شما هستیم با یکی دیگر از مقالات آموزشی وین گیم! با ما همراه باشید
              </Typography>
              <Box sx={{textAlign:"justify",lineHeight:"30px"}}>
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
                    .map((review) => (
                      <Review
                        id={review._id!}
                        userId={review.userId}
                        rating={review.rating!}
                        description={review.description}
                        createdAt={review.createdAt!}
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
              <RecentPosts />
              <RecentComments />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Article;
