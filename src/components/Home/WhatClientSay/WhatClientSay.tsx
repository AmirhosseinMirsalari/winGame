import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Title } from "../ShopByCategories/styles";
import ClientCard from "./ClientCard/ClientCard";
import { Container, WrapperBox, boxStyles } from "./styles";

function WhatClientSay({ whatClientSay }: any) {
  const { ref, inView } = useInView({ triggerOnce: true });
  SwiperCore.use([Autoplay]);

  const reviews = whatClientSay?.whatClientSayData ?? [];

  return (
    <WrapperBox className={inView ? "slideInFromBottom" : ""} ref={ref}>
      <Box sx={boxStyles}>
        <Title sx={{ fontSize: "24px" }} variant="h4">
          مشتریان درباره ما چه می گویند؟
        </Title>
        <img
          className="loading"
          src="https://res.cloudinary.com/dmgb7kvmn/image/upload/v1665232874/digita-images/static/uej2dnhrgldg1jaztexn.png"
          alt="loading"
        />
        <Container>
          <div className="swiper-button-prev-client" />
          <div className="swiper-button-next-client" />
          <Swiper
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
              nextEl: ".swiper-button-next-client",
              prevEl: ".swiper-button-prev-client",
            }}
            loop={true}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation, Pagination]}
          >
            {!whatClientSay.isError &&
              !whatClientSay.isLoading &&
              reviews.map((review: any) => {
                return (
                  <SwiperSlide key={review._id}>
                    <ClientCard review={review} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </Container>
      </Box>
    </WrapperBox>
  );
}

export default WhatClientSay;
