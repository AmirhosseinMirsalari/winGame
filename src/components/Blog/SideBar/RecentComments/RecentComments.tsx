import { Box, Skeleton, Typography } from "@mui/material";
import { FilterTitleWrapper } from "components/Shop/styles";
import RecentComment from "./RecentComment/RecentComment";

function RecentComments({ reviewsData }: any) {
  const reviews = reviewsData?.reviews ?? [];
  console.log(reviewsData);
  
  return (
    <Box
      sx={{
        border: "1px solid #e9e9e9",
        px: "20px",
        pt: "20px",
        pb: "30px",
        mb: "30px",
      }}
    >
      <FilterTitleWrapper className="underline">
        <Typography
          component={"h4"}
          variant="body1"
          color="primary"
          fontWeight={600}
        >
          آخرین نظرات
        </Typography>
      </FilterTitleWrapper>
      {!reviewsData.isLoading && !reviewsData.isError
        ? reviews.map((review: any) => (
            <RecentComment
              key={review._id!}
              id={review._id!}
              title={review?.articleId?.title}
              articleId={review?.articleId?._id}
              userName={review?.userId?.userName ?? "deleted account "}
            />
          ))
        : Array(4)
            .fill(null)
            .map((item, index) => (
              <Box
                sx={{
                  display: "flex",
                  height: "40px",
                  marginTop: "14px",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
                key={index}
              >
                <Skeleton width={"100%"} height={20} variant="rectangular" />
                <Skeleton width={"40%"} height={15} variant="rectangular" />
              </Box>
            ))}
    </Box>
  );
}

export default RecentComments;
