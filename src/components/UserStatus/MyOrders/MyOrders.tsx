import { KeyboardArrowLeft } from "@mui/icons-material";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { profileWrapper, topMenuItem, wrapper,wrapperMobile } from "../../../../styles/user";
import { useTheme } from "@mui/material/styles";

function MyOrders({ sidebar }: { sidebar: boolean }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useRouter();
  return (
    <Box sx={!matches ? wrapper : wrapperMobile }  className={sidebar ? "sidebar" : ""}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "40px",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>سفارشات من</Typography>
        <Box sx={topMenuItem}>
          <Box sx={{ display: "flex", gap: 1 }} onClick={() => navigate.push("/user/orders")}>
            <Typography sx={{ fontSize: "18px" }}>دیدن همه</Typography>
            <KeyboardArrowLeft className="navIcon" />
          </Box>
        </Box>
      </Box>

      <Grid container sx={{marginRight:"-10px"}} columnSpacing={3}>
        <Grid item xs={4} sm={4}>
          <Box sx={profileWrapper} onClick={() => navigate.push("/user/orders")}>
            <Box component="img" src="https://www.digikala.com/statics/img/svg/status-processing.svg" alt="order" />
            <Box>
              <Typography component={"span"} sx={{ fontSize: { xs: "13px", sm: "20px" } }}>
              ۰ سفارش
              </Typography>
              <Box
                sx={{
                  padding: { xs: "3px 6px", sm: "4px 10px" },
                  borderRadius: "10px",
                  background: "#CFD1F6",
                  marginTop: "4px",
                  color: "blue",
                }}
              >
                <Typography sx={{ fontSize: { xs: "9px", sm: "15px" },whiteSpace:"nowrap" }}>در حال بررسی</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={4} sm={4}>
          <Box sx={profileWrapper} onClick={() => navigate.push("/user/orders")}>
            <Box
              component="img"
              src="https://www.digikala.com/statics/img/svg/status-delivered.svg"
              alt="order"
              className="itemImg"
            />
            <Box>
              <Typography component={"span"} sx={{ fontSize: { xs: "13px", sm: "20px" } }}>
              ۴ سفارش
              </Typography>
              <Box
                sx={{
                  padding: { xs: "3px 6px", sm: "4px 10px" },
                  borderRadius: "10px",
                  background: "#C4FCEF",
                  marginTop: "4px",
                  color: "green",
                }}
              >
                <Typography sx={{ fontSize: { xs: "10px", sm: "15px" },whiteSpace:"nowrap" }}>تحویل داده</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={4} sm={4}>
          <Box sx={profileWrapper} onClick={() => navigate.push("/user/orders")}>
            <Box
              component="img"
              src="https://www.digikala.com/statics/img/svg/status-returned.svg"
              alt="order"
              className="itemImg"
            />
            <Box>
              <Typography component={"span"} sx={{ fontSize: { xs: "13px", sm: "20px" },whiteSpace:"nowrap"  }}>
              ۰ سفارش
              </Typography>
              <Box
                sx={{
                  padding: { xs: "3px 6px", sm: "4px 10px" },
                  borderRadius: "10px",
                  background: "#F9F871",
                  marginTop: "4px",
                  color: "#A45C40",
                }}
              >
                <Typography sx={{ fontSize: { xs: "9px", sm: "15px" },whiteSpace:"nowrap" }}>مرجوعی</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyOrders;
