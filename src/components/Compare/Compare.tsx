import { Close } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../redux/store";
import { CompareWrapper, CTButton } from "./styles";
import ItemsTable from "./ItemsTable/ItemsTable";
import { useRouter } from "next/router";

interface Props {
  setOpenCompareModal: Dispatch<SetStateAction<boolean>>;
}

function Compare({ setOpenCompareModal }: Props) {
  const { compareList, category } = useAppSelector(
    (state) => state.reducer.compare
  );
  const navigate = useRouter();

  const clickHandler = () => {
    const query = category.replaceAll(" ", "+").replaceAll("&", "%26");
    navigate.push({
      pathname: `/shop`,
      search: category ? `?category=%2F${query}` : "",
    });
    setOpenCompareModal(false);
  };

  return (
    <CompareWrapper>
      <Box sx={{ height: "90%", overflow: "auto", backgroundColor: "white" }}>
        <Box
          className="close-button"
          onClick={() => setOpenCompareModal(false)}
        >
          <Close />
        </Box>
        <Box className="title">
          <Typography component={"h2"}>مقایسه محصولات</Typography>
        </Box>
        {compareList.length === 0 ? (
          <Box textAlign={"center"}>
            <Typography
              variant="h6"
              textTransform={"capitalize"}
              textAlign={"center"}
              my={4}
            >
              هیچ محصولی برای مقایسه اضافه نشده است
            </Typography>
            <CTButton variant="contained" onClick={clickHandler}>
              add product
            </CTButton>
          </Box>
        ) : (
          <Box sx={{ display: "flex" }}>
            <ItemsTable products={compareList} />
            {compareList.length === 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "30%",
                }}
              >
                <CTButton variant="contained" onClick={clickHandler}>
                  انتخاب محصول
                </CTButton>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </CompareWrapper>
  );
}

export default Compare;
