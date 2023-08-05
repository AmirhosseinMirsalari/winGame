import { NavigateBefore } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs as Breadcrumb,
  Link,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

interface Props {
  title: string;
  lastPath?: string | boolean;
  category?: string;
}
function Breadcrumbs({ title, lastPath, category = "" }: Props) {
  const Location = useRouter();
  let pathnames = Location.asPath.split("/").filter((x) => x);
  let categoryRoute = pathnames.includes("product") ? "shop" : "بلاگ";
  if (category) {
    pathnames.splice(pathnames.length - 1, 0, category);
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(https://s8.uupload.ir/files/dark-hexagonal-background-with-gradient-color_79603-1409_6evz.jpg)`,
        height: { xs: "160px", sm: "210px", md: "260px" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundPosition: "center  ",
        backgroundSize: "cover",
      }}
    >
      <Typography
        color="white"
        variant="h3"
        textTransform={"capitalize"}
        fontWeight={600}
        mb={2}
        sx={{ fontSize: { xs: "24px", sm: "32px", md: "40px" } }}
      >
        {title}
      </Typography>
      <Breadcrumb
        sx={{ "& .MuiBreadcrumbs-ol": { justifyContent: "center" } }}
        separator={
          <NavigateBefore
            sx={{ color: "white", fontSize: "20px", margin: 0 }}
          />
        }
      >
        <Link
          href="/"
          color="#fff"
          underline="none"
          sx={{
            transition: "all 150ms ease-in",
            "&:hover": { color: "#f03637" },
          }}
        >
          صفحه اصلی
        </Link>
        {pathnames.map((path, index) => {
          let route = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          let name = path.replace(/-/g, " ");

          if (name.includes("product") || Location.asPath.includes("shop")) {
            name = "فروشگاه";
            route = "/shop";
          }
          if (name === "checkout") {
            name = "تسویه حساب";
            route = "/checkout";
          }
          if (name === "cart") {
            name = "سبد خرید";
            route = "/cart";
          }
          if (name === "article" || name === "blog") {
            name = "بلاگ";
            route = "/blog";
          }
          if (name === "contact us") {
            name = "تماس با ما";
            route = "/contact-us";
          }
          if (name === category) {
            route = `/${categoryRoute}?category=/${category.replace(
              "&",
              "%26"
            )}`;
          }
          return isLast ? (
            <Typography
              key={index}
              sx={{ color: "#fff", textTransform: "capitalize" }}
            >
              {`${lastPath ? lastPath : name}`}
            </Typography>
          ) : (
            <Link
              key={index}
              href={route}
              color="#fff"
              underline="none"
              textTransform={"capitalize"}
              sx={{
                transition: "all 150ms ease-in",
                "&:hover": { color: "#f03637" },
              }}
            >
              {name}
            </Link>
          );
        })}
      </Breadcrumb>
    </Box>
  );
}

export default Breadcrumbs;
