import Head from "next/head";
import Header from "components/Home/Header/Header";
import Products from "components/Home/Products/Products";
import ShopByCategories from "components/Home/ShopByCategories/ShopByCategories";
import Special from "components/Home/Special/Special";
import OurBlog from "components/Home/OurBlog/OurBlog";
import WhatClientSay from "components/Home/WhatClientSay/WhatClientSay";


const Home = () => {
  return (
    <>
      <Head>
        <title>ویـن گـیم</title>
      </Head>
      <Header />
      <Products />
      <ShopByCategories />
      <Special />
      <WhatClientSay />
      <OurBlog />
    </>
  );
};

export default Home;
