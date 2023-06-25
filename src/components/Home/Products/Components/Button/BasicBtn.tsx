import { Box, Button } from "@mui/material";
import { useInView } from "react-intersection-observer";
import Link from "next/link"

const BasicBtn = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "2rem 0",
        animation: (theme) =>
          inView
            ? `btnSlideInFromBottom 1500ms ${theme.transitions.easing.easeInOut}`
            : "",
        "@keyframes btnSlideInFromBottom": {
          "0%": {
            opacity: 0,
            transform: "translateY(200%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
      ref={ref}
    >
      <Link href="/shop">
      <Button
        variant="contained"
        sx={{
          padding: "0.899rem 3.2rem",
          fontSize: "16px",
          textTransform: "uppercase",
          borderRadius:"20px",
        }}
      >
        فروشگاه
      </Button>
      </Link>

    </Box>
  );
};
export default BasicBtn;
