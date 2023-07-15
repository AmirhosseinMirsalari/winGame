import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { supportStyle, itemStyle } from "../../styles";
import { useInView } from "react-intersection-observer";

const SupportItems = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <Grid container sx={supportStyle} ref={ref} className={inView ? "slideInFromBottom" : ""}>
      <Grid item xs={12} sm={6} lg={3}>
        {/* ======== ITEM ======= */}
        <Box sx={itemStyle}>
          <LocalShippingIcon sx={{ color: "#f03637", fontSize: "40px" }} />
          <Box sx={{ marginLeft: "0.6rem" }}>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#333",
                textTransform: "uppercase",
              }}
            >
              پست پیشتاز
            </Typography>
            <Typography sx={{ fontWeight: 400, color: "#777",marginTop:"5px",fontSize:"14px" }}>دارای پست رایگان</Typography>
          </Box>
        </Box>
      </Grid>

      {/* ======== ITEM ======= */}
      <Grid item xs={12} sm={6} lg={3}>
        <Box sx={itemStyle}>
          <CurrencyExchangeIcon sx={{ color: "#f03637", fontSize: "40px" }} />
          <Box sx={{ marginLeft: "0.6rem" }}>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#333",
                textTransform: "uppercase",
              }}
            >
              ضمانت بازگشت وجه
            </Typography>
            <Typography sx={{ fontWeight: 400, color: "#777",marginTop:"5px",fontSize:"14px" }}>در صورت عدم رضایت</Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <Box sx={itemStyle}>
          <PaymentIcon sx={{ color: "#f03637", fontSize: "40px" }} />
          <Box sx={{ marginLeft: "0.6rem" }}>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#333",
                textTransform: "uppercase",
              }}
            >
              امنیت در پرداخت
            </Typography>
            <Typography sx={{ fontWeight: 400, color: "#777",marginTop:"5px",fontSize:"14px" }}>دارای درگاه پرداخت امن</Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <Box sx={itemStyle}>
          <SupportAgentIcon sx={{ color: "#f03637", fontSize: "40px" }} />
          <Box sx={{ marginLeft: "0.6rem" }}>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#333",
                textTransform: "uppercase",
              }}
            >
              پشتیبانی شبانه روزی
            </Typography>
            <Typography sx={{ fontWeight: 400, color: "#777",marginTop:"5px",fontSize:"14px" }}>آماده پاسخ گویی هستیم</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default SupportItems;
