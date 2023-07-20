import Link from "next/link";
import { Typography } from "@mui/material";

type props = {
  id: string;
  title: string;
};

const CardTitle = ({ id, title }: props) => {
  return (
    <Link href={`/article/${id}`}>
      <Typography
        sx={{
          fontSize: { xs: "16px", sm: "20px" },
          "&:hover": { color: "#f03637", transition: "all 500ms" },
          cursor: "pointer"
        }}
        
        variant="body1"
      >
        {" "}
        {title}
      </Typography>
    </Link>
  );
};

export default CardTitle;
