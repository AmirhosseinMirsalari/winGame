import { Paper, Table, TableCell, Typography, TableRow, Box, TableBody, Button } from "@mui/material";
import { StyledTableCell, TotalTextStyle } from "../../styles";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "redux/store";
import { useRouter } from "next/router";
import { numberFormat } from "utils/numberFormat";

type Props = {
  total: number;
};

const CartTotalTable = ({ total }: Props) => {
  const { user } = useAppSelector((state) => state.reducer.auth);

  const navigate = useRouter();

  const CustomTableContainer = styled(Box)(({ theme }) => ({
    width: "40%",
    marginLeft: "30px",
    height: "max-content",
    border: "1px solid #ebebeb",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      margin: "0 0 44px ",
    },
  }));

  return (
    <CustomTableContainer component={Paper}>
      <Typography
        sx={{
          padding: "0.7em 0",
          fontSize: "1.077em",
          fontWeight: 600,
          textAlign: "center",
          lineHeight: 1.4,
          borderBottom: "1px solid #ebebeb",
          width: "100%",
        }}
      >
        مجموع سبد خرید
      </Typography>
      <Box sx={{ width: "100%", padding: "0 20px 20px", boxSizing: " border-box" }}>
        <Table sx={{ border: "0", margin: "20px 0 20px" }}>
          <TableBody>
            <TableRow>
              <StyledTableCell variant="head">قیمت پایه</StyledTableCell>
              <TableCell
                sx={{
                  borderLeft: "1px solid #ebebeb",
                  borderColor: "#ebebeb",
                  color: "#f03637",
                }}
              >
                {numberFormat(total)} تومان
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell variant="head">هزینه ارسال</StyledTableCell>
              <TableCell
                sx={{
                  borderLeft: "1px solid #ebebeb",
                  borderColor: "#ebebeb",
                  color: "#666",
                }}
              >
                <Typography component="span" fontSize="14px">
                  آدرس خود را مشخص کنید
                </Typography>
                <Typography
                  component="a"
                  sx={{
                    display: "block",
                    fontSize: "13px",
                    color: "common.digitaBlack",
                    textDecoration: "underline",
                    cursor: "pointer",
                    marginTop: "4px",
                    "&:hover": {
                      color: "common.digitaRed",
                    },
                  }}
                >
                  محاسبه حمل و نقل
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell sx={{ lineHeight: "1.5em" }} variant="head">
                قیمت کل
              </StyledTableCell>
              <TableCell sx={{ borderLeft: "1px solid #ebebeb", borderColor: "#ebebeb" }}>
                <Typography
                  sx={Object.assign(
                    { ...TotalTextStyle },
                    {
                      fontWeight: 600,
                      color: "#f03637",
                    }
                  )}
                >
                  {numberFormat(total)} تومان
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button variant="contained" sx={{ width: "100%", padding: "8px 0" }} onClick={()=>{!user ? navigate.push("/?login=open") : navigate.push("/checkout")  }}>
        {!user ? "ورود و " : ""} تسویه حساب
        </Button>
      </Box>
    </CustomTableContainer>
  );
};

export default CartTotalTable;
