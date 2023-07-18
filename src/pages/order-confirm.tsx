import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Box, Button, Container, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "redux/store";

function OrderConfirm() {
  const navigate = useRouter()
  const { role } = useAppSelector((state) => state.reducer.auth);

  if (!role) {
    navigate.push("/")
  }
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "75vh", padding: { xs: "0" } }}
    >
      <Head>
        <title>وین گیم | سفارش ثبت شد</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: "15px",
          padding: { xs: "20px" },
          height: { xs: "100%", sm: "unset" },
        }}
      >
        <Box textAlign="center">
          <CheckCircleRoundedIcon sx={{ fontSize: 110, fontWeight: 100, color: "#f03637", padding: 2 }} />
          <Typography variant="h4" fontWeight={500}>
            سفارش با موفقیت ثبت شد
          </Typography>
        </Box>
        <Typography sx={{ textAlign: "center", width: { xs: "80%", sm: "60%" }, marginTop: "20px" }}>
        سفارش شما تایید شد به زودی یک ایمیل تأیید سفارش با تاریخ تحویل مورد انتظار دریافت خواهید کرد
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            margin: "0.5rem 0",
            marginTop: "60px",
            flexDirection: { xs: "column", sm: "row" },
            width: { xs: "100%", sm: "unset" },
          }}
        >
          <Link href="/shop">
          <Button
            variant="contained"
            sx={{
              padding: "0.8rem 2.2rem",
              background: "#f03637",
              "&:hover": { background: "#333" },
            }}
          >
            ادامه خرید
          </Button>
          </Link>
          <Link href={`/${role === "admin" ? "panel" : "user"}/orders`}>
          <Button
            variant="contained"
            sx={{ padding: "0.8rem 2.2rem" }}
          >
            نمایش سفارش
          </Button>
          </Link>

        </Box>
      </Box>
    </Container>
  );
}

export default OrderConfirm;
