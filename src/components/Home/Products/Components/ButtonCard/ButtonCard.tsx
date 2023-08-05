import { Box } from "@mui/material";
import { StyledBtn } from "../../styles";
import { useRouter } from "next/router";

const ButtonCard = () => {
  const router = useRouter()
  return (
    <Box sx={{ margin: "2.2rem 0" }}>
      <StyledBtn onClick={()=>router.push("/shop")} variant="contained">مشاهده محصولات</StyledBtn>
    </Box>
  );
};

export default ButtonCard;
