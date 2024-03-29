import { Grid, Box, Typography } from "@mui/material";
import { productShareItems } from "./data";
import { PinterestIcon, FacebookIcon, MailIcon, TwitterIcon } from "./icons";

const ShareProduct = () => {
  return (
    <Grid
      container
      sx={{
        margin: "4rem 0",
        "& svg": {
          m: 1.5,
        },
      }}
    >
      {productShareItems.map(({ id, name, color }, index) => (
        <Grid item xs={6} sm={6} md={3} key={id}>
          <Box
            sx={{
              padding: "20px 0",
              border: "1px solid #e9e9e9",
              borderRadius:"15px",

            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "fit-content",
                margin: "auto",
                cursor: "pointer",
                gap: "10px",
                flexDirection: { xs: "column", md: "row" },
                "&:hover": {
                  "& .icon": {
                    backgroundColor: color,
                  },
                  "& .text": {
                    color: color,
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "common.digitaBlack",
                  transition: "all 150ms",
                  borderRadius: "50%",
                  "& .MuiSvgIcon-root": { color: "white" },
                }}
                className="icon"
              >
                {name === "توییتر" && <TwitterIcon />}
                {name === "فیسبوک" && <FacebookIcon />}
                {name === "ایمیل" && <MailIcon />}
                {name === "پینترست" && <PinterestIcon />}
              </Box>
              <Box>
                <Typography
                  component="p"
                  sx={{
                    color: "common.digitaBlack",
                    transition: "all 150ms",
                    fontSize: { xs: "14px", sm: "13px" },
                  }}
                  className="text"
                >
                  {name === "فیسبوک" ? "اشتراک گذاری با فیسبوک" : ` اشتراک گذاری با ${name}`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShareProduct;
