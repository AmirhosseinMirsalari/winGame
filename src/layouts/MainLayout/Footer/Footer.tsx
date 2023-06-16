import FooterList from "./FooterList/FooterList";
import Subscription from "./Subscription/Subscription";
import { Grid, Typography, Link, Box } from "@mui/material";
import { companyInfo, letUsHelpYou, quickLinks, userFullLinks } from "./data";
import { useRouter } from "next/router";

function Footer() {
  const { asPath } = useRouter()

  return (
    <Box
      sx={{
        paddingTop: asPath.length === 1 ? "160px" : "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        bgcolor: "#092240",
        fontFamily: "iranyekan",
      }}
    >
      <Grid container height="100%" display="flex" justifyContent="space-around" alignItems="center">
        <Grid item xs={6} sm={4} md={2} alignSelf={"flex-start"}>
          <FooterList title={"وین گیم"} links={companyInfo} />
        </Grid>
        <Grid item xs={6} sm={4} md={2} alignSelf={"flex-start"}>
          <FooterList title={"حساب کاربری"} links={letUsHelpYou} />
        </Grid>
        <Grid item xs={6} sm={4} md={2} alignSelf={"flex-start"}>
          <FooterList title={"دسترسی سریع"} links={quickLinks} />
        </Grid>
        <Grid item xs={6} sm={4} md={2} alignSelf={"flex-start"}>
          <FooterList title={"محصولات"} links={userFullLinks} />
        </Grid>
        <Grid item xs={12} sm={8} md={4} alignSelf={"flex-start"}>
          <Subscription />
        </Grid>
      </Grid>
      <Box
        sx={{
          margin: "20px auto 0",
          borderTop: "1px solid #9d9d9d99",
          width: "100%",
        }}
      >
        <Typography variant="body1" color="lightslategray" my={4} mx={2} textAlign="center">
         توسعه داده شده توسط   
        <Link sx={{ color: "#fff", cursor: "pointer" }}>{` امیرحسین میرسالاری`}</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
