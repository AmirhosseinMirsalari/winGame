import Header from "components/Home/Header/Header";
import OurBlog from "components/Home/OurBlog/OurBlog";
import Products from "components/Home/Products/Products";
import ShopByCategories from "components/Home/ShopByCategories/ShopByCategories";
import Special from "components/Home/Special/Special";
import WhatClientSay from "components/Home/WhatClientSay/WhatClientSay";
import Head from "next/head";
import http from "utils/services/httpServices";

const Home = ({
  articlesData,
  whatClientSay,
  shopByCat,
  productsLatest,
  productsRating,
  products,
}: any) => {
  return (
    <>
      <Head>
        <title>ویـن گـیم</title>
      </Head>
      <Header />
      <Products products={products} />
      <ShopByCategories shopByCat={shopByCat} />
      <Special
        productsRating={productsRating}
        productsLatest={productsLatest}
      />
      <WhatClientSay whatClientSay={whatClientSay} />
      <OurBlog articlesData={articlesData} />
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const { data } = await http.get(`/articles`);
    const { data: WhatClientSay } = await http.get(
      "/products/reviews?page=1&limit=4"
    );
    const { data: productsLatest } = await http.get(
      "/products?page=1&limit=9&sort=latest"
    );
    const { data: productsRating } = await http.get(
      "/products?page=1&limit=9&sort=rating"
    );
    const { data: products } = await http.get(
      "/products?category=/موبایل/هدفون/واقعیت%20مجازی&limit=18"
    );

    const shopByCat = [
      {
        id: 1,
        name: "هدفون",
        img: "https://res.cloudinary.com/dmgb7kvmn/image/upload/v1665231992/digita-images/static/tr3qpslgdln1xa1peejz.jpg",
      },
      {
        id: 2,
        name: "واقعیت مجازی",
        img: "https://res.cloudinary.com/dmgb7kvmn/image/upload/v1665231970/digita-images/static/espjllskb1kherjwc22b.jpg",
      },
      {
        id: 3,
        name: "موبایل",
        img: "https://res.cloudinary.com/dmgb7kvmn/image/upload/v1665231928/digita-images/static/im5yn5hse1vi8v0yfjq1.jpg",
      },
      {
        id: 4,
        name: "بازی های ویدیویی",
        img: "https://res.cloudinary.com/dmgb7kvmn/image/upload/v1665231952/digita-images/static/g0vjz0rrhhwemqouimfy.jpg",
      },
    ];
    return {
      props: {
        articlesData: {
          articles: data?.data || [],
          total: data?.total || 0,
          isLoading: false, // Set loading state here if needed
          isError: false, // Set error state here if needed
        },
        whatClientSay: {
          whatClientSayData: WhatClientSay?.data || [],
          total: WhatClientSay?.total || 0,
          isLoading: false, // Set loading state here if needed
          isError: false, // Set error state here if needed
        },
        shopByCat,
        productsLatest: {
          productsLatestData: productsLatest?.data || [],
          total: productsLatest?.total || 0,
          isLoading: false,
          isError: false, // Set error state if request fails
        },
        productsRating: {
          productsRatingData: productsRating?.data || [],
          total: productsRating?.total || 0,
          isLoading: false,
          isError: false, // Set error state if request fails
        },
        products: {
          productsData: products?.data || [],
          total: productsRating?.total || 0,
          isLoading: false,
          isError: false, // Set error state if request fails
        },
      },
    };
  } catch (error) {
    return {
      props: {
        articlesData: {
          articles: [],
          total: 0,
          isLoading: false,
          isError: true, // Set error state if request fails
        },
        whatClientSay: {
          whatClientSayData: [],
          total: 0,
          isLoading: false, // Set loading state here if needed
          isError: true, // Set error state here if needed
        },
        shopByCat: [],
        productsLatest: {
          productsLatestData: [],
          total: 0,
          isLoading: false,
          isError: true, // Set error state if request fails
        },
        productsRating: {
          productsRatingData: [],
          total: 0,
          isLoading: false,
          isError: true, // Set error state if request fails
        },
        products: {
          productsData: [],
          total: 0,
          isLoading: false,
          isError: true, // Set error state if request fails
        },
      },
    };
  }
}
