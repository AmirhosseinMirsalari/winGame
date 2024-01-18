import { Favorite, FavoriteBorder, Shuffle } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Rating,
  Typography,
} from "@mui/material";
import { QuantityInput } from "components/Cart";
import CompareModal from "components/Compare/Compare";
import WishModal from "components/Home/Products/Components/Modals/WishModal/WishModal";
import { useAddToCart } from "hooks/useAddToCart";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ImageGallery from "react-image-gallery";
import { useDispatch } from "react-redux";
import { useGetAllCartItemQuery } from "redux/cart/cartApi";
import { addToCompareList } from "redux/compare/compareSlice";
import { useAppSelector } from "redux/store";
import {
  useAddWishMutation,
  useDeleteWishMutation,
  useGetWishlistQuery,
} from "redux/wishlist/wishlistApi";
import { IProduct } from "types/product";
import { isInList } from "utils/isInList";
import { numberFormat } from "utils/numberFormat";
import {
  CartButtonsStyle,
  ProductDetailsStyle,
  filledPrice,
  linkStyle,
  productButtonStyles,
  productIconStyles,
  productMetaStyle,
  productTitle,
  starLink,
  starRating,
} from "../styles";
import ColorPicker from "./ColorPicker/ColorPicker";

interface Props {
  product: IProduct;
}
const ProductDetails = ({ product, reviewsData }: any) => {
  const { role, user } = useAppSelector((state) => state.reducer.auth);
  const { cartList } = useAppSelector((state) => state.reducer.cart);
  const { compareList } = useAppSelector((state) => state.reducer.compare);

  const [openCart, setOpenCart] = useState(false);
  const [openWish, setOpenWish] = useState(false);
  const [addedWish, setAddedWish] = useState(false);
  const [openCompareModal, setOpenCompareModal] = useState(false);

  const location = useRouter();
  const dispatch = useDispatch();

  const reviewsLength = reviewsData?.reviews.length ?? 0;

  const { data: cartData } = useGetAllCartItemQuery(undefined, {
    skip: !!!user,
  });
  const cart = cartData?.data?.products ?? [];
  const cartItems = user ? cart : cartList;
  const inCart = isInList(cartItems, product?._id!);
  const cartItem = cartItems.find(
    (item) => item?.productId?._id === product?._id
  );

  const { data: wishlistData } = useGetWishlistQuery(role ?? "", {
    skip: !!!user,
  });
  const wishlist = wishlistData?.data ?? [];
  let wished = false;
  if (user) {
    wished = isInList(wishlist, product?._id!);
  }
  const { addToCartHandler } = useAddToCart(inCart, product, setOpenCart);

  const [addWish, { isLoading: addLoading }] = useAddWishMutation();
  const [deleteWish, { isLoading: delLoading }] = useDeleteWishMutation();
  const {
    _id,
    title,
    price,
    offPrice,
    rating,
    sku,
    colors,
    shortDescription,
    gallery,
    category,
  } = product;

  const isCompared = isInList(compareList, _id!);

  const wishlistHandler = async () => {
    if (!user || !role) {
      location.push("/?login=open");
      return;
    }
    try {
      let response;
      if (!wished) {
        response = await addWish({ path: role!, id: _id }).unwrap();
        setAddedWish(true);
      } else {
        response = await deleteWish({ path: role!, id: _id }).unwrap();
        setAddedWish(false);
      }
      setOpenWish(true);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const compareClickHandler = () => {
    dispatch(addToCompareList(product));
    setOpenCompareModal(true);
  };
  const images = gallery.map((item: any) => {
    return {
      original: item.image,
      thumbnail: item.image,
    };
  });

  return (
    <Box my={5}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ImageGallery showFullscreenButton={false} items={images} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "relative", overflow: "hidden" }}>
            <Box sx={{ position: "absolute", zIndex: "11111" }}>
              <div id="myPortal" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4" sx={productTitle}>
                {title}
              </Typography>
            </Box>
            <Box sx={starLink}>
              <Rating
                title="read-only"
                defaultValue={rating}
                size="small"
                readOnly
                sx={starRating}
              />
              <Link
                href={`/product/${_id}?tab=reviews#reviews`}
                className="customerReview"
              >{`(${reviewsLength} نظر مشتریان)`}</Link>
            </Box>
            <Box sx={filledPrice}>
              <bdi style={{ fontFamily: "iranyekan" }}>{`${
                offPrice ? offPrice : ` ${numberFormat(price)} هزار تومان`
              }`}</bdi>
            </Box>

            <Typography variant="body2" sx={ProductDetailsStyle} component="p">
              {shortDescription}
            </Typography>

            {colors.length > 0 && <ColorPicker colors={colors} />}

            <Box>
              <Box sx={CartButtonsStyle}>
                {!inCart && (
                  <Button
                    variant="contained"
                    className="addCart"
                    sx={{ borderRadius: "12px" }}
                    onClick={addToCartHandler}
                  >
                    افزودن به سبد خرید
                  </Button>
                )}
                {inCart && (
                  <>
                    <QuantityInput cartItem={cartItem!} />
                    <Link href="/cart">
                      <Button
                        variant="contained"
                        sx={{ height: "100%", borderRadius: "12px" }}
                      >
                        نمایش سبد خرید
                      </Button>
                    </Link>
                  </>
                )}
              </Box>
            </Box>

            <Box sx={productButtonStyles}>
              <Button
                component="button"
                onClick={wishlistHandler}
                sx={{
                  color: wished ? "#f03637 !important" : "common.digitaBlack",
                }}
                className={addLoading || delLoading ? "صبر کنید" : ""}
              >
                {wished ? (
                  <Favorite
                    sx={{ color: "common.digitaRed", ...productIconStyles }}
                    className={addLoading || delLoading ? "صبر کنید" : ""}
                  />
                ) : (
                  <FavoriteBorder
                    sx={productIconStyles}
                    className={addLoading || delLoading ? "wishLoading" : ""}
                  />
                )}
                علاقه مندی ها
              </Button>

              <Button
                component="button"
                onClick={compareClickHandler}
                sx={{
                  color: isCompared
                    ? "#f03637 !important"
                    : "common.digitaBlack",
                  borderRadius: "12px",
                  "&:hover .icon": {
                    color: "common.digitaRed",
                  },
                }}
              >
                <Shuffle
                  sx={{
                    transition: "all 200ms",
                    color: isCompared
                      ? "#f03637 !important"
                      : "common.digitaBlack",
                  }}
                  className="icon"
                />
                مقایسه محصولات
              </Button>
            </Box>
          </Box>
          <Divider sx={{ width: "100%" }} />
          <Box sx={productMetaStyle}>
            <Box>
              <Typography component="span">{sku}</Typography>
            </Box>
            <Box>
              <Typography component="span" className="span">
                دسته بندی :
              </Typography>
              <Button
                onClick={() => location.push(`/shop?category=%2F${category}`)}
                sx={linkStyle}
              >
                {category}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={openWish}
        onClose={() => setOpenWish(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <WishModal
            setOpenWish={setOpenWish}
            addedWish={addedWish}
            role={role}
          />
        </div>
      </Modal>
      <Modal
        open={openCompareModal}
        onClose={() => setOpenCompareModal(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div>
          <CompareModal setOpenCompareModal={setOpenCompareModal} />
        </div>
      </Modal>
    </Box>
  );
};

export default ProductDetails;
