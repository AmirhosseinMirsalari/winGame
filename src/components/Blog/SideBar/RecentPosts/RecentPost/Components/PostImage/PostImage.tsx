import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";

type props = {
  id: string;
  title: string;
  image: string;
};

const PostImage = ({ id, title, image }: props) => {
  return (
    <Link href={`/article/${id}`}>
      <CardMedia
        component="img"
        sx={{
          width: 80,
          cursor: "pointer",
          height: 60,
          "&:hover": {
            filter: "brightness(70%)",
            transition: "all 500ms",
          },
        }}
        image={`${image}`}
        alt={`${title}`}
      />
    </Link>
  );
};

export default PostImage;
