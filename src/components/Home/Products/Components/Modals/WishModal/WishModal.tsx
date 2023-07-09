import { Dispatch, SetStateAction } from "react";
import { Button, Box, Typography } from "@mui/material";
import { CloseRounded, Favorite, FavoriteBorder } from "@mui/icons-material";
import { closeStyle, wishStyle } from "../../../styles";
import Link from "next/link";

interface Props {
  setOpenWish: Dispatch<SetStateAction<boolean>>;
  addedWish: boolean;
  role: string | null | undefined;
}
function WishModal({ setOpenWish, addedWish, role }: Props) {
  return (
    <Box sx={wishStyle}>
      <Box sx={closeStyle} onClick={() => setOpenWish(false)}>
        <CloseRounded fontSize="medium" />
      </Box>
      {addedWish && <Favorite sx={{ fontSize: 50, color: "#f03637" }} />}

      <Typography
        id="modal-modal-title"
        variant="h5"
        component="h2"
        sx={{ padding: "1.4rem 0" }}
      >
        {!addedWish
          ? "محصول از لیست علاقه مندی ها پاک شد"
          : "محصول به لیست علاقه مندی ها اضافه شد"}
      </Typography>
      <Link
        href={`/${
          role === "admin" || role === "superAdmin" ? "panel" : "user"
        }/wishlist`}
      >
        <Button
          variant="contained"
          sx={{ width: "100%", padding: "0.8rem 0" }}
        >
          <FavoriteBorder sx={{ marginRight: "0.3rem" }} />
          مشاهده لیست علافه مندی ها
        </Button>
      </Link>
    </Box>
  );
}

export default WishModal;
