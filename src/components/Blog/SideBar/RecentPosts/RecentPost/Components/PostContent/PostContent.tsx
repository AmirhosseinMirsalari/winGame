import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { getReadableDate } from "utils/getReadableDate";
import Link from "next/link";

type props = {
  id: string;
  title: string;
  date: string;
};

const PostContent = ({ id, title, date }: props) => {
  const readableDate = getReadableDate(date);
  return (
    <Box>
      <CardContent
        sx={{
          px: 0,
        }}
      >
        <Link href={`/article/${id}`}>
          <Typography
            variant="subtitle2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              cursor: "pointer",
              fontSize: "14px",
              "&:hover": {
                color: "#f03637",
                transition: "all 500ms",
              },
            }}
          >
            {title}
          </Typography>
        </Link>
        <Typography
          variant="body2"
          color="text.secondary"
          mt={"6px"}
          fontSize="11px"
        >
          {readableDate}
        </Typography>
      </CardContent>
    </Box>
  );
};

export default PostContent;
