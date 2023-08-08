import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import { Address, Form, Map } from "components/Contact";
import Head from "next/head";

function ContactUs() {
  const DEFAULT_CENTER = [35.700105, 51.400394];

  return (
    <Box bgcolor={"white"}>
      <Head>
        <title>وین گیم | تماس با ما</title>
      </Head>
      <Breadcrumbs title={"تماس با ما"} />
      <Container maxWidth={"lg"}>
        <Address />
        <Grid container spacing={3} paddingY={6}>
          <Grid item xs={12} md={6}>
            <Map width="800" height="400" center={DEFAULT_CENTER} zoom={15}>
              {({ TileLayer, Marker, Popup }:any) => (
                <>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={DEFAULT_CENTER}>
                    <Popup>ما اینجاییم، حضورا هم درخدمت شما هستیم</Popup>
                  </Marker>
                </>
              )}
            </Map>
          </Grid>
          <Grid item xs={12} md={6}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactUs;
