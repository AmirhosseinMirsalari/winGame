import { Box } from "@mui/material";
import styles from "./dot-spinner.module.css";
function DotSpinner({ color }: { color?: string }) {
  return (
    <Box display={"flex"}>
      <svg viewBox="0 0 120 120" className={`${styles.dot_spinner} ${color}`}>
        <circle cx="46.6" cy="10" r="10" />
        <circle cx="73.4" cy="10" r="10" />
        <circle cx="96.6" cy="23.4" r="10" />
        <circle cx="110" cy="46.6" r="10" />
        <circle cx="110" cy="73.4" r="10" />
        <circle cx="96.6" cy="96.6" r="10" />
        <circle cx="73.4" cy="110" r="10" />
        <circle cx="46.6" cy="110" r="10" />
        <circle cx="23.4" cy="96.6" r="10" />
        <circle cx="10" cy="73.4" r="10" />
        <circle cx="10" cy="46.6" r="10" />
        <circle cx="23.4" cy="23.4" r="10" />
      </svg>
    </Box>
  );
}

export default DotSpinner;
