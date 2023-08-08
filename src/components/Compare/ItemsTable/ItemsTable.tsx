import { Close } from "@mui/icons-material";
import { Box, Table, TableBody, TableRow } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeFromCompareList } from "redux/compare/compareSlice";
import {
  compareTableStyles,
  CTButton,
  CTCell,
  CTHCell,
  tableImageStyles,
  tableRemoveBtnStyles,
} from "../styles";
import { useAddToCart } from "hooks/useAddToCart";
import { isInList } from "utils/isInList";
import { useAppSelector } from "redux/store";
import { useGetAllCartItemQuery } from "redux/cart/cartApi";
import { IProduct } from "types/product";

const compareIndexes = [
  { key: "نام", value: "title" },
  { key: "قیمت", value: "price" },
  { key: "اضافه کردن به سبد خرید", value: "افزودن به سبد خرید" },
  { key: "توضیحات", value: "shortDescription" },
  { key: "رنگ ها", value: "colors" },
];
interface Props {
  products: any[];
  id: any;
  product: any;
  setOpenCart: any;
}
function ItemsTable({ products, id, product, setOpenCart }: Props) {
  const { role, user } = useAppSelector((state) => state.reducer.auth);
  const { cartList } = useAppSelector((state) => state.reducer.cart);

  const { data: cartData } = useGetAllCartItemQuery(undefined, {
    skip: !!!user,
  });
  const cart = cartData?.data?.products ?? [];
  const cartItems = user ? cart : cartList;
  const inCart = isInList(cartItems, id!);
  const dispatch = useDispatch();
  let widthClass = `w-${products.length + 1}`;

  const removeHandler = (id: number) => () => {
    dispatch(removeFromCompareList(id));
  };

  const { addToCartHandler, cartIsLoading } = useAddToCart(
    inCart,
    product,
    setOpenCart
  );

  return (
    <Table sx={{ width: products.length === 1 ? "70%" : "100%" }}>
      <TableBody sx={compareTableStyles} className={widthClass}>
        <TableRow>
          <CTHCell className="td"></CTHCell>
          {products.map((product, index) => (
            <CTCell key={index}>
              <Box
                sx={tableRemoveBtnStyles}
                onClick={removeHandler(product._id)}
              >
                پاک کردن
                <Close />
              </Box>
            </CTCell>
          ))}
        </TableRow>
        <TableRow>
          <CTHCell></CTHCell>
          {products.map((product, index) => (
            <CTCell key={index}>
              <Box sx={tableImageStyles}>
                <img src={product.image} alt={product.title} />
              </Box>
            </CTCell>
          ))}
        </TableRow>
        {compareIndexes.map(({ key, value }, index) => {
          return (
            <TableRow key={index}>
              <CTHCell>{key}</CTHCell>

              {products.map((product, index) => (
                <CTCell key={index} className={value === "price" ? "bold" : ""}>
                  {key === "اضافه کردن به سبد خرید" && (
                    <CTButton onClick={addToCartHandler} variant="contained">
                      {value}
                    </CTButton>
                  )}

                  {product[value]}
                </CTCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default ItemsTable;
