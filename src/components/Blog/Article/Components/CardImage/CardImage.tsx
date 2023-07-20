import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";

type props = {
  id: string;
  title: string;
  image: string;
};
const CardImage = ({ id, image, title }: props) => {
  return (
    <Link  href={`/article/${id}`}>
      <a>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ aspectRatio: "1.2", objectFit: "fill" }}
      />
      </a>
    </Link>
  );
};

export default CardImage;
