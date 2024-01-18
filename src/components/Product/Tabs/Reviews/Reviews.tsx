import {
  Box,
  Button,
  Divider,
  FormLabel,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import OpenLoginContext from "context/openLogin";
import { useLoadReviews } from "hooks/useLoadReviews";
import { useRouter } from "next/router";
import { Fragment, useContext, useState } from "react";
import { useAddReviewMutation } from "redux/reviews/reviewsApi";
import { useAppSelector } from "redux/store";
import { IReviews } from "types/product";
import { PFormControl } from "../../../../../styles/panel";
import { ProductContentStyle, SubmitButton } from "../../styles";
import Review from "./Review/Review";

interface Props {
  reviews: IReviews[] | [];
  id: string;
}
const Reviews = ({ reviews, id }: Props) => {
  const { user } = useAppSelector((state) => state.reducer.auth);
  const { openLogin, setOpenLogin } = useContext(OpenLoginContext);
  const [rating, setRating] = useState(1);
  const [reviewDescription, setReviewDescription] = useState("");
  const { indexOfLoadedReviews, loadMoreReviewsHandler } =
    useLoadReviews(reviews);
  const location = useRouter();

  const [addReview] = useAddReviewMutation();


  const submitReviewHandler = async () => {
    if (!user) {
      setOpenLogin(true);
      return;
    }
    try {
      let response = await addReview({
        path: "products",
        id,
        review: {
          rating,
          description: reviewDescription,
        },
      }).unwrap();
      console.log(response);
      if (response.code === 200) {
        setReviewDescription("");
        setRating(1);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }} id="reviews">
      <Box sx={ProductContentStyle}>
        {reviews?.length !== 0 ? (
          reviews
            ?.slice(0, indexOfLoadedReviews)
            .map((review) => (
              <Review
                id={review._id!}
                key={review._id!}
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
              هیچ نظری برای این محصول ثبت نشده است
            </Typography>
          </Box>
        )}
        {reviews.length > 6 && (
          <Button
            variant="contained"
            color="error"
            sx={{ display: "block", margin: "10px 0 0 auto" }}
            onClick={loadMoreReviewsHandler}
          >
            {indexOfLoadedReviews < reviews.length ? "بارگذاری بیشتر" : "بستن"}
          </Button>
        )}

        <Box mb={2} mt={10}>
          <Typography
            component="p"
            sx={{
              color: "common.digitaGrey3",
              fontSize: "14px",
              marginTop: "10px",
              marginBottom: "5px",
              textAlign: "start",
            }}
          >
            امتیاز شما
            <Typography
              component={"span"}
              sx={{ color: "#f03637", marginRight: "4px" }}
            >
              *
            </Typography>
          </Typography>

          <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[1, 2, 3, 4, 5].map((rate) => (
              <Fragment key={rate}>
                {rate !== 1 && (
                  <Divider orientation="vertical" variant="middle" flexItem />
                )}
                <Box
                  sx={{
                    cursor: "pointer",
                    "& .MuiRating-root": {
                      color: rate === rating ? "#faaf00" : "common.digitaGrey6",
                    },
                    "&:hover .MuiRating-root": { color: "#faaf00" },
                  }}
                  onClick={() => setRating(rate)}
                >
                  <Rating
                    name="read-only"
                    defaultValue={rate}
                    readOnly
                    max={rate}
                  />
                </Box>
              </Fragment>
            ))}
          </Box>
        </Box>

        <Box>
          <PFormControl>
            <FormLabel
              color="primary"
              sx={{
                fontSize: "15px",
                color: "#333333",
                marginBottom: "5px",
                textAlign: "start",
                marginTop: "5px",
              }}
            >
              نظر شما
              <Typography
                component={"span"}
                sx={{ color: "#f03637", marginRight: "3px" }}
              >
                *
              </Typography>
            </FormLabel>
            <TextField
              multiline
              rows={6}
              sx={{
                borderRadius: "15px",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "common.digitaGrey6",
                  borderRadius: "15px",
                },
              }}
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
            />
          </PFormControl>
        </Box>

        <Button
          variant="contained"
          sx={SubmitButton}
          onClick={submitReviewHandler}
        >
          {user ? "ثبت نظر" : "ورود و ثبت نظر"}
        </Button>
      </Box>
    </Box>
  );
};

export default Reviews;
