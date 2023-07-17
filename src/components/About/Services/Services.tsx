import { Grid, Box, Typography, Container } from "@mui/material";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import SettingsIcon from "@mui/icons-material/Settings";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { serviceStyle, serviceTitle, itemStyle } from "../styles";

const Services = () => {
  return (
    <Box sx={{ backgroundColor: "#F9F9F9", marginTop: "60px" }}>
      <Container maxWidth={"lg"} sx={{ padding: "80px 0" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={serviceTitle}>
            چرا باید ما را انتخاب کنید؟
          </Typography>
        </Box>
        <Grid container sx={serviceStyle}>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            {/* ======== ITEM ======= */}
            <Box sx={itemStyle}>
              <Box>
                <SettingsIcon sx={{ color: "#f03637", fontSize: "65px" }} />
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#333",
                    textTransform: "capitalize",
                    fontSize: "18px",
                  }}
                >
                  پست پیشتاز
                </Typography>
                <Typography sx={{ fontWeight: 400, color: "#777", mt: 1 }}>
                  دارای پست رایگان
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* ======== ITEM ======= */}
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Box sx={itemStyle}>
              <Box>
                <PriceCheckIcon sx={{ color: "#f03637", fontSize: "65px" }} />
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#333",
                    textTransform: "capitalize",
                  }}
                >
                  ضمانت بازگشت وجه
                </Typography>
                <Typography sx={{ fontWeight: 400, color: "#777", mt: 1 }}>
                  در صورت عدم رضایت یا خرابی محصول
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Box sx={itemStyle}>
              <Box>
                <AccessibilityNewIcon
                  sx={{ color: "#f03637", fontSize: "65px" }}
                />
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#333",
                    textTransform: "capitalize",
                  }}
                >
                  امنیت در پرداخت
                </Typography>
                <Typography sx={{ fontWeight: 400, color: "#777", mt: 1 }}>
                  دارای درگاه پرداخت امن
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Box sx={itemStyle}>
              <Box>
                <CreditScoreIcon sx={{ color: "#f03637", fontSize: "65px" }} />
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#333",
                    textTransform: "capitalize",
                  }}
                >
                  پشتیبانی شبانه روزی
                </Typography>
                <Typography sx={{ fontWeight: 400, color: "#777", mt: 1 }}>
                  آماده پاسخ گویی هستیم
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
