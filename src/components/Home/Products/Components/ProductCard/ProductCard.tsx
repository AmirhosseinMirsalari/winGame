import { Card, Box, Typography } from "@mui/material";
import ButtonCard from "../ButtonCard/ButtonCard";
import { useInView } from "react-intersection-observer";
import { AnimatedGrid, cardStyle, contentStyle, styleContent } from "../../styles";

type Props = {
  title: string;
  name: string;
  image: string;
  id: number;
};

const ProductCard = ({ title, name, image, id }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  const classes = id === 0 ? "slideInFromLeft" : "slideInFromRight";
  return (
    <AnimatedGrid item xs={12} sm={6} md={6} ref={ref} className={inView ? classes : ""}>
      <Card sx={cardStyle}>
        <Box sx={contentStyle} className="box">
          <img src={image} alt="img" className="img-card" />
        </Box>
        <Box sx={styleContent} className="card-content">
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: "500",
              textTransform: "uppercase",
              color: "#fff",
              marginBottom:"25px"
            }}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="h5" component="h5" color="white" fontWeight="bold" sx={{ width: "340px" }}>
            {name}
          </Typography>
          <ButtonCard />
        </Box>
      </Card>
    </AnimatedGrid>
  );
};

export default ProductCard;
