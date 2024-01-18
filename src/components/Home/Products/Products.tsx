import { Box, Container, Grid } from "@mui/material";
import ProductPlaceholder from "components/Placeholders/ProductPlaceholder";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import BasicBtn from "./Components/Button/BasicBtn";
import ProductHeader from "./Components/Header/ProductHeader";
import ProductCards from "./Components/ProductCards/ProductCards";
import ProductItem from "./Components/ProductItem/ProductItem";
import { subMainContainer } from "./styles";

const Products = ({ products }: any) => {
  const [selectedCategory, setSelectedCategory] = useState("موبایل");
  const { ref, inView } = useInView({ triggerOnce: true });

  const productsData = products.productsData ?? [];

  console.log(products);

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        position: "relative",
        backgroundColor: "white",
        marginY: { xs: "-45px", sm: "-120px" },
        width: "96%",
        zIndex: "10",
      }}
      ref={ref}
    >
      <Container
        maxWidth={"lg"}
        sx={subMainContainer}
        className={inView ? "slideInFromBottom" : ""}
      >
        <ProductHeader
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Box>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {!products.isLoading && !products.isError && productsData.length > 0
              ? productsData
                  .filter((p: any) => p.category === selectedCategory)
                  .map((product: any) => (
                    <Grid item xs={12} sm={4} md={3} key={product?._id}>
                      <ProductItem product={product} listView={false} />
                    </Grid>
                  ))
              : Array(8)
                  .fill(null)
                  .map((item, index) => (
                    <Grid item xs={12} sm={4} md={3} key={index}>
                      <ProductPlaceholder />
                    </Grid>
                  ))}
          </Grid>
        </Box>
        <BasicBtn />
        <ProductCards />
      </Container>
    </Container>
  );
};

export default Products;
