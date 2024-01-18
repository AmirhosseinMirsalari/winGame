import { Skeleton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { FilterTitleWrapper } from "components/Shop/styles";
import { Fragment } from "react";
import RecentPost from "./RecentPost/RecentPost";

function RecentPosts({ articlesDataRecent }: any) {
  const articles = articlesDataRecent?.articlesRecent ?? [];
  return (
    <Box
      sx={{
        border: "1px solid #e9e9e9",
        px: "10px",
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
          مقالات اخیر
        </Typography>
      </FilterTitleWrapper>
      {!articlesDataRecent.isLoading && !articlesDataRecent.isError
        ? articles.map((post: any, index: any) => (
            <Fragment key={post._id}>
              {index !== 0 ? <Divider sx={{ mb: "14px" }} /> : null}
              <RecentPost
                id={post._id!}
                title={post.title}
                image={post.image}
                date={post.createdAt!}
              />
            </Fragment>
          ))
        : Array(4)
            .fill(null)
            .map((item, index) => (
              <Box
                sx={{
                  display: "flex",
                  height: "60px",
                  gap: "10px",
                  marginTop: "14px",
                }}
                key={index}
              >
                <Box sx={{ width: "40%" }}>
                  <Skeleton
                    width={"100%"}
                    height={"100%"}
                    variant="rectangular"
                  />
                </Box>
                <Box
                  sx={{
                    width: "60%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Skeleton width={"100%"} height={20} variant="rectangular" />
                  <Skeleton width={"40%"} height={15} variant="rectangular" />
                </Box>
              </Box>
            ))}
    </Box>
  );
}

export default RecentPosts;
