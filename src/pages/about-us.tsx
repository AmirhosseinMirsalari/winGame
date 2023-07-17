import { Box, Container } from "@mui/material";
import { Poster, Contents, Services } from "components/About";
import Head from "next/head";

const AboutUs = () => {
  return (
    <Box bgcolor={"white"}>
      <Head>
        <title>وین گیم | درباره ما</title>
      </Head>
      <Container maxWidth={"xl"}>
        <Poster />
      </Container>
      <Container maxWidth={"lg"}>
        <Contents />
      </Container>
      <Services />
    </Box>
  );
};

export default AboutUs;
