import { Typography, Box } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";

interface Props {
  title: string;
  links: { name: string; route: string }[];
}
function FooterList({ title, links }: Props) {
  return (
    <Box p="1rem">
      <Box>
        <Typography variant="h6" mb={2.5} color="white">
          {title}
        </Typography>
      </Box>
      {links?.map(({ name, route }) => {
        let to = route;
        if (name === "آدرس ها" || name === "اطلاعات حساب کاربری") {
          to = "/panel/settings";
        }
        return (
          <Link href={to}>
            <a>
              <Box
                key={name}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textTransform: "capitalize",
                  textDecoration: "none",
                  color: "#C1C4C9CC",
                  marginBottom: "6px",
                  cursor: "pointer",
                  lineHeight: "35px",
                  "&:hover": { color: "#f03637" },
                }}
              >
                {name}
                <ChevronRightIcon
                  sx={{ fontSize: "20px", transform: "rotate(180deg)" }}
                />
              </Box>
            </a>
          </Link>
        );
      })}
    </Box>
  );
}

export default FooterList;
