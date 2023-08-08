import { useRef, ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  Divider,
  FormGroup,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import {
  ShippingDatePicker,
  OrderTable,
  PaymentMethod,
  CurrentAddress,
  AddressForm,
  Coupon,
  OrderNotes,
} from "components/Checkout";
import {
  addressModalWrapper,
  addressTitleStyles,
  checkoutProceedBtn,
  checkoutTitleWrapper,
  StyledFormControlLabel,
} from "components/Checkout/styles";
import { IAddress } from "types/user";
import { useAppSelector } from "redux/store";
import { setCredentials } from "redux/auth/authSlice";
import { errorMessage, successMessage } from "utils/toastMessages";
import { useDispatch } from "react-redux";
import Address from "components/Settings/Addresses/Address/Address";
import { cartModal } from "components/Home/Products/styles";
import { Add, Close } from "@mui/icons-material";
import { useGetAllCartItemQuery } from "redux/cart/cartApi";
import { getSubtotal } from "utils/getSubtotal";
import { useAddOrderMutation } from "redux/orders/ordersApi";
import Loading from "components/Loading/Loading";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import { useRouter } from "next/router";
import { useUpdateUserMutation } from "redux/user/userApi";
import Head from "next/head";

function Checkout() {
  const { user, role } = useAppSelector((state) => state.reducer.auth);

  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(false);
  const [displayAddresses, setDisplayAddresses] = useState(false);
  const [displayCoupon, setDisplayCoupon] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [currentAddress, setCurrentAddress] = useState<IAddress | null>(
    user?.addresses[0] ?? null
  );
  const [addressError, setAddressError] = useState("");
  const [date, setDate] = useState<{
    endValue: Date | null;
    startValue: Date | null;
    rangeDates: Date[] | null;
  }>({
    startValue: null,
    endValue: null,
    rangeDates: [],
  });

  const notesRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useRouter();

  const { data: cartData, isLoading } = useGetAllCartItemQuery();
  const cart = cartData?.data;

  const subtotal = getSubtotal(cart?.products!);

  const [updateUser] = useUpdateUserMutation();
  const [addOrder] = useAddOrderMutation();

  const displayAddressesToggler = () => {
    if (!currentAddress || user?.addresses.length === 1) return;

    setDisplayAddresses(true);
  };
  const couponToggler = (event: ChangeEvent<HTMLInputElement>) => {
    setDisplayCoupon(event.target.checked);
  };

  const addAddress = async (address: IAddress, mode: string) => {
    let addressArr = [...(user?.addresses ?? [])];
    if (mode === "edit") {
      const index = addressArr.findIndex((ads) => ads?._id === address._id);
      addressArr[index] = address;
    } else {
      addressArr.push(address);
    }
    try {
      await updateUser({
        id: user?._id!,
        path: role!,
        user: {
          addresses: addressArr,
        },
      }).unwrap();

      let updatedUser = {
        ...user,
        addresses: addressArr,
      };

      dispatch(
        setCredentials({
          user: updatedUser,
          role: role,
          email: null,
        })
      );
      successMessage(`عملیات با موفقیت انجام شد`);
      setDisplayCurrentAddress(false);
      setCurrentAddress(address);
    } catch (err: any) {
      errorMessage(err?.data.message);
      console.log(err);
    }
  };

  const selectAddress = (address: IAddress) => {
    setCurrentAddress(address);
    setDisplayAddresses(false);
  };

  const submitOrderHandler = async () => {
    if (!currentAddress) {
      window.document.getElementById("error")?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
      return setAddressError("لطفا یک آدرس اضافه کنید");
    }
    const order = {
      date: date.startValue,
      paymentMethod: selectedPaymentMethod,
      address: currentAddress,
      notes: notesRef?.current?.value,
      products: cart?.products,
      coupon: couponValue,
    };
    try {
      const res = await addOrder({ path: role!, order }).unwrap();
      navigate.push("/order-confirm");
    } catch (err: any) {
      errorMessage(err?.data.message);
    }
  };
  if (cart && cart?.products.length === 0 && !isLoading) {
    navigate.push("/order-confirm");
  }
  if (!user) {
    navigate.push("/?login=open");
    return <Loading full />
  }
  if (!cart && isLoading) {
    return <Loading full />;
  }
  if (user) {
    return (
      <>
        <Head>
          <title>تسویه حساب</title>
        </Head>
        <Breadcrumbs title="تسویه حساب" />
        <Box bgcolor={"white"}>
          <Container maxWidth={"lg"} sx={{ py: "50px" }}>
            {addressError && !currentAddress && (
              <Box
                sx={{
                  backgroundColor: "common.digitaRed",
                  padding: "10px 15px",
                  marginBottom: "40px",
                }}
                id="error"
              >
                <Typography
                  sx={{
                    color: "white ",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <Close />
                  {addressError}
                </Typography>
              </Box>
            )}
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Grid
                  container
                  rowSpacing={2}
                  sx={{ padding: "25px", border: "2px solid #eaeaea" }}
                >
                  <Grid item xs={12}>
                    <Box sx={checkoutTitleWrapper}>
                      <Typography component={"h2"}>اطلاعات پرداخت</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <CurrentAddress
                      currentAddress={currentAddress}
                      setDisplayCurrentAddress={setDisplayCurrentAddress}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Collapse in={displayCurrentAddress}>
                      <>
                        <AddressForm
                          addAddress={addAddress}
                          buttonText={currentAddress ? "ویرایش" : "اضافه"}
                          currentAddress={currentAddress}
                        />
                      </>
                    </Collapse>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={addressTitleStyles}
                      onClick={displayAddressesToggler}
                    >
                      <Typography component="h4">
                        ارسال به آدرس متفاوت
                      </Typography>
                      <Add className="icon" />
                    </Box>
                    <Divider sx={{ width: "97%", mt: "4px", mb: "20px" }} />
                    <Modal
                      open={displayAddresses}
                      onClose={() => setDisplayAddresses(false)}
                    >
                      <Box
                        sx={{
                          ...cartModal,
                          ...addressModalWrapper,
                        }}
                      >
                        <Box>
                          <Box
                            className="close-button"
                            onClick={() => setDisplayAddresses(false)}
                          >
                            <Close />
                          </Box>
                          {user?.addresses.map((item) => (
                            <Address
                              key={item?._id}
                              address={item}
                              selectAddress={selectAddress}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Modal>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>چه روزی می خواهید تحویل بگیرید؟</Typography>
                    <ShippingDatePicker date={date} setDate={setDate} />
                  </Grid>
                  <Grid item xs={12}>
                    <FormGroup>
                      <StyledFormControlLabel
                        control={<Checkbox onChange={couponToggler} />}
                        label="کد تخفیف دارید؟"
                      />
                    </FormGroup>
                    <Divider sx={{ width: "97%", mt: "4px", mb: "20px" }} />
                    <Collapse in={displayCoupon}>
                      <>
                        <Coupon setCouponValue={setCouponValue} />
                      </>
                    </Collapse>
                  </Grid>
                  <Grid item xs={12}>
                    <OrderNotes notesRef={notesRef} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid
                  container
                  rowSpacing={2}
                  sx={{ padding: "25px", border: "2px solid #eaeaea" }}
                >
                  <Grid item xs={12}>
                    <Box sx={checkoutTitleWrapper}>
                      <Typography component={"h2"}>سفارش شما</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <OrderTable
                      cartItems={cart?.products!}
                      subtotal={subtotal}
                      currentAddress={currentAddress}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PaymentMethod
                      setSelectedPaymentMethod={setSelectedPaymentMethod}
                      selectedPaymentMethod={selectedPaymentMethod}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      component={"p"}
                      sx={{
                        color: "common.digitaGrey3",
                        fontSize: "14px",
                        textAlign: "justify",
                      }}
                    >
                      اطلاعات شخصی و پرداخت شما طبق قوانین حریم شخصی وین گیم،
                      محفوظ می ماند
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      sx={checkoutProceedBtn}
                      onClick={submitOrderHandler}
                      disabled={selectedPaymentMethod === "paypal"}
                    >
                      {selectedPaymentMethod === "cash"
                        ? "سفارش"
                        : "پرداخت آنلاین"}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default Checkout;
