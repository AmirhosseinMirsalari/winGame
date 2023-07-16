import { Box, Button, Container, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

function pageNotFound() {
  return (
    <Container>
      <Head>
        <title>وین گیم | صفحه ای یافت نشد</title>
      </Head>
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          gap: "20px",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          color="#323232"
          fontSize={"35px"}
        >
          صفحه مورد نظر پیدا نشد
        </Typography>
        <Typography variant="h6" fontWeight={400}>
          متاسفیم! این صفحه ممکن است وجود نداشته باشد و یا حذف شده باشد
        </Typography>
        <Link href="/">
        <Button
          variant="contained"
          color="error"
          sx={{
            marginTop: "10px",
            paddingY: "10px",
            borderRadius:"10px",
            "&:hover": { backgroundColor: "common.digitaBlack" },
          }}
        >
          رفتن به صفحه اصلی
        </Button>
        </Link>
        
      </Box>
    </Container>
  );
}

export default pageNotFound;
