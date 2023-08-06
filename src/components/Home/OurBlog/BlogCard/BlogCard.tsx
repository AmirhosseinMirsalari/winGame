import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Card, iconStyle, textStyle } from "./Styles";
import { IArticle } from "types/article";
import Link from "next/link";
import { getReadableDate } from "utils/getReadableDate";

interface Props {
  item: IArticle;
}

function BlogCard({ item }: Props) {
  
  return (
    <Card>
      <Box>
        <Link href={`/article/${item._id}`}>
          <img src={item.image} alt="article" />
        </Link>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "12px",
                }}
              >
                <PermIdentityIcon sx={iconStyle} />
                <Typography sx={textStyle}>{item.writer}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center",marginRight:"12px" }}>
                <AccessTimeIcon sx={iconStyle} />
                <Typography sx={textStyle}>{getReadableDate(item.createdAt || "")}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ paddingTop: "0!important" }}>
            <Typography
              variant="h2"
              sx={{
                lineHeight: "1.5",
                fontSize: "20px",
                textAlign:"justify",
                fontWeight: 500,
                a: {
                  color: "#333333",
                  textDecoration: "none",
                  transition: "all 200ms",
                  "&:hover": {
                    color: "common.digitaRed",
                  },
                },
              }}
            >
              <Link href={`article/${item._id}`}>{item.title}</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default BlogCard;
