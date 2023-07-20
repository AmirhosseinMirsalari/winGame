import { Typography } from "@mui/material";
import Link from "next/link";

type props = {
  id: string;
  title: string;
  userName: string;
  articleId: string;
};

const RecentComment = ({ id, userName, title, articleId }: props) => {
  return (
    <Link
      href={`/article/${articleId}`}
    >
      <Typography
        sx={{
          "&:hover": {
            color: "#f03637",
            transition: "all 500ms",
          },
          cursor: "pointer"
        }}
        variant="body2"
        color="text.secondary"
        pt={2}
      >
        {userName} در {title}
      </Typography>
    </Link>
  );
};

export default RecentComment;
