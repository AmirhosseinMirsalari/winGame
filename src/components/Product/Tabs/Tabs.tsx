import TabsUnstyled from "@mui/base/TabsUnstyled";
import { ShowStyle, CascadingTabsTitle, CascadingTabs, TabsList, Tab, TabPanel, moreStyles } from "../styles";
import Description from "./Description/Description";
import Delivery from "./Delivery/Delivery";
import AboutBrand from "./AboutBrand/AboutBrand";
import Reviews from "./Reviews/Reviews";

import { Box, Collapse, Typography } from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { IProduct } from "types/product";
import { useGetReviewsQuery } from "redux/reviews/reviewsApi";
import { useRouter } from "next/router";
interface Props {
  product: IProduct;
}
const initialTabsState = {
  desc: true,
  reviews: true,
  about: false,
  delivery: false,
};
function Tabs({ product }: Props) {
  const router = useRouter()
  const [openTabs, setOpenTabs] = useState(initialTabsState);
  const searchParams = new URLSearchParams(router.query);
  const { data: reviewsData } = useGetReviewsQuery({
    path: "products",
    id: product._id!,
  });
  const reviews = reviewsData?.data ?? [];
  const tabValue = searchParams.get("tab") ?? "";

  const tabSelectHandler = (event: SyntheticEvent, value: any) => {
    if (!value) {
      searchParams.delete("tab");
    } else {
      searchParams.set("tab", value);
    }
    
    router.replace({
      pathname: router.pathname,
      search: searchParams.toString(),
    });
  };
  const openTabsHandler = (value: string) => () => {
    setOpenTabs((prev: any) => ({ ...prev, [value]: !prev[value] }));
  };

  return (
    <Box sx={ShowStyle}>
      <Box className="TabsShow" sx={{ width: "100%" }}>
        <TabsUnstyled value={tabValue} onChange={tabSelectHandler}>
          <TabsList>
            <Tab value="">توضیحات محصول</Tab>
            <Tab value="reviews">{`نظرات ${reviews.length !== 0 ? `(${reviews.length})` : ""}`}</Tab>
            <Tab value="about">درباره برند</Tab>
            <Tab value="delivery">حمل و نقل محصولات</Tab>
          </TabsList>
          <TabPanel value={""}>
            <Description description={product.fullDescription} />
          </TabPanel>
          <TabPanel value={"reviews"}>
            <Reviews id={product._id!} reviews={reviews} />
          </TabPanel>
          <TabPanel value={"about"}>
            <AboutBrand brand={product.brand} />
          </TabPanel>
          <TabPanel value={"delivery"}>
            <Delivery />
          </TabPanel>
        </TabsUnstyled>
      </Box>

      <Box className="CascadinShow">
        <Box>
          <Box sx={CascadingTabs} onClick={openTabsHandler("desc")}>
            <Typography variant="h4" sx={CascadingTabsTitle} component="div">
              توضیحات محصول
            </Typography>
            <Typography sx={moreStyles}>{openTabs.desc ? <ExpandLess /> : <ExpandMore />}</Typography>
          </Box>
          <Collapse in={openTabs.desc}>
            <Description description={product.fullDescription} />
          </Collapse>
        </Box>

        <Box>
          <Box sx={CascadingTabs} onClick={openTabsHandler("reviews")}>
            <Typography variant="h4" sx={CascadingTabsTitle} component="div" id="review">
              {`نظرات کاربران ${reviews.length !== 0 ? `(${reviews.length})` : ""}`}
            </Typography>
            <Typography sx={moreStyles}>{openTabs.reviews ? <ExpandLess /> : <ExpandMore />}</Typography>
          </Box>
          <Collapse in={openTabs.reviews}>
            <Reviews id={product._id!} reviews={reviews} />
          </Collapse>
        </Box>

        <Box>
          <Box sx={CascadingTabs} onClick={openTabsHandler("about")}>
            <Typography variant="h4" sx={CascadingTabsTitle} component="div">
              درباره ی برند محصول
            </Typography>
            <Typography sx={moreStyles}>{openTabs.about ? <ExpandLess /> : <ExpandMore />}</Typography>
          </Box>
          <Collapse in={openTabs.about}>
            <AboutBrand brand={product.brand} />
          </Collapse>
        </Box>

        <Box>
          <Box sx={CascadingTabs} onClick={openTabsHandler("delivery")}>
            <Typography variant="h4" sx={CascadingTabsTitle} component="div">
              ارسال و حمل و نقل
            </Typography>
            <Typography sx={moreStyles}>{openTabs.delivery ? <ExpandLess /> : <ExpandMore />}</Typography>
          </Box>
          <Collapse in={openTabs.delivery}>
            <Delivery />
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
}

export default Tabs;
