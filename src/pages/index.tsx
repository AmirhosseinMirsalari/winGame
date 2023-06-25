import Head from "next/head";
import Header from "components/Home/Header/Header";
import Products from "components/Home/Products/Products";

const Home = () => {
  return (
    <>
      <Head>
        <title>ویـن گـیم</title>
      </Head>
      <Header />
      <Products />
    </>
  );
};

export default Home;
