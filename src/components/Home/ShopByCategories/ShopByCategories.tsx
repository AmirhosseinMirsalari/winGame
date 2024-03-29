import { Box } from "@mui/material";
import Slider from "./Slider/Slider";
import { boxStyles, Title, WrapperBox } from "./styles";
import { useInView } from "react-intersection-observer";

function ShopByCategories({ shopByCat }: any) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <WrapperBox className={inView ? "slideInFromBottom" : ""} ref={ref}>
      <Box sx={boxStyles}>
        <Title variant="h2">خرید بر اساس دسته بندی</Title>
        <img
          className="loading"
          src="https://res.cloudinary.com/dmgb7kvmn/image/upload/v1665232874/digita-images/static/uej2dnhrgldg1jaztexn.png"
          alt="loading"
        />
        <Slider shopByCat={shopByCat} />
      </Box>
    </WrapperBox>
  );
}

export default ShopByCategories;
