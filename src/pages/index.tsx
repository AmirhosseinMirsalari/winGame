import Head from "next/head";
import Header from "components/Home/Header/Header";
import Products from "components/Home/Products/Products";
import ShopByCategories from "components/Home/ShopByCategories/ShopByCategories";

const Home = () => {
  return (
    <>
      <Head>
        <title>ویـن گـیم</title>
      </Head>
      <Header />
      <Products />
      <ShopByCategories />
    </>
  );
};

export default Home;
