import { Container } from "@mui/material";
import ArticlePlaceholder from "components/Placeholders/ArticlePlaceholder";
import { useInView } from "react-intersection-observer";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Title } from "../ShopByCategories/styles";
import BlogCard from "./BlogCard/BlogCard";
import { ContainerWrapper, WrapperBox } from "./styles";

function OurBlog({ articlesData }: any) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const articles = articlesData?.articles ?? [];

  return (
    <ContainerWrapper
      maxWidth={"xl"}
      ref={ref}
      className={inView ? "slideInFromBottom" : ""}
    >
      <Title variant="h2" sx={{ color: "#333" }}>
        بلاگ آموزشی
      </Title>
      <img
        className="loading"
        src="https://res.cloudinary.com/dmgb7kvmn/image/upload/v1665232874/digita-images/static/uej2dnhrgldg1jaztexn.png"
        alt="blog-bg"
      />
      <Container>
        <WrapperBox>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next-blog",
              prevEl: ".swiper-button-prev-blog",
            }}
            modules={[Pagination, Navigation]}
            breakpoints={{
              // when window width is >= 768px
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {!articlesData.isLoading && !articlesData.isError
              ? articles.map((item: any) => (
                  <SwiperSlide key={item._id!}>
                    <BlogCard item={item} />
                  </SwiperSlide>
                ))
              : Array(6)
                  .fill(null)
                  .map((item, index) => (
                    <SwiperSlide key={index}>
                      <ArticlePlaceholder />
                    </SwiperSlide>
                  ))}
          </Swiper>
          <div className="swiper-button-prev-blog" />
          <div className="swiper-button-next-blog" />
        </WrapperBox>
      </Container>
    </ContainerWrapper>
  );
}

export default OurBlog;
