import { FormEvent, useState, useRef } from "react";
import { CloseRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "redux/auth/authApi";
import { setCredentials } from "redux/auth/authSlice";
import { useAppSelector } from "redux/store";
import {
  errorStyles,
  forgetPassStyles,
  FormFooter,
  FormWrapper,
  inputErrorStyles,
} from "./styles";
import Header from "./Header/Header";
import LoadingBar from "react-top-loading-bar";
import { useAddMultipleCartItemsMutation } from "redux/cart/cartApi";
import { removeAllCartItems } from "redux/cart/cartSlice";
import { useRouter } from "next/router";
import { successMessage } from "utils/toastMessages";

type Modal = "login" | "register" | "reset";
type Props = {
  setModalType?: any;
  setOpenLogin?: any;
};
function Login({ setModalType, setOpenLogin }: Props) {
  const { email, user } = useAppSelector((state) => state.reducer.auth);
  const { cartList } = useAppSelector((state) => state.reducer.cart);
  const [enteredEmail, setEnteredEmail] = useState(email ?? "");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visibility, setVisibility] = useState(false);

  const loadingRef = useRef<any>(null);
  const dispatch = useDispatch();
  const location: any = useRouter();
  

  //* username validation
  let emailIsValid = enteredEmail.trim() !== "";
  const emailError = !emailIsValid && validationError;

  //* password validation
  let passwordIsValid = enteredPassword.trim() !== "";
  const passwordError = !passwordIsValid && validationError;

  const [login, { isLoading }] = useLoginMutation();
  const [addMultipleCartItems] = useAddMultipleCartItemsMutation();

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    loadingRef?.current.staticStart();
    if (!emailIsValid && !passwordIsValid) {
      setValidationError(true);
      loadingRef?.current.complete();
      return;
    }
    try {
      const userCredentials = {
        email: enteredEmail,
        password: enteredPassword,
      };

      const response = await login(userCredentials).unwrap();
      const data = response?.data;
      // toast.success("با موفقیت وارد شدید")

      dispatch(
        setCredentials({
          user: data?.details,
          role: data.role,
          email: null,
        })
      );

      if (location.state?.from.pathname === "/checkout") {
        try {
          await addMultipleCartItems(cartList).unwrap();
          dispatch(removeAllCartItems());
        } catch (err: any) {
          setErrorMessage(err?.data?.message);
        }
      }

      if (data?.role === "admin" || data?.role === "superAdmin") {
        location.push("/panel/dashboard");
      }
      if (data?.role === "user" && location.asPath == "/?login=open") {
        location.push("/");
      }
      loadingRef?.current?.complete();
      successMessage("با موفقیت وارد شدید");
      setOpenLogin(false);
    } catch (err: any) {
      setErrorMessage(err?.data?.message);
      loadingRef?.current.complete();
    }
  };

  return (
    <>
      <LoadingBar color="#f03637" ref={loadingRef} />
      <FormWrapper>
        <Box sx={{ position: "relative" }}>
          <Header
            title={"ورود به حساب کاربری"}
            subtitle={"عضو خانواده ی وین گیم شوید!"}
          />
          {errorMessage && (
            <Box sx={errorStyles}>
              <Typography component="span">ارور : {errorMessage}</Typography>
            </Box>
          )}
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    variant="standard"
                    label="ایمیل"
                    InputLabelProps={{ sx: { marginLeft: "90%" } }}
                    sx={emailError ? inputErrorStyles : { direction: "ltr" }}
                    value={enteredEmail}
                    onChange={(e) => setEnteredEmail(e.target.value)}
                  />
                  {emailError && (
                    <Typography
                      sx={{
                        color: "#f03637",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      فیلد ایمیل اجباری است
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ position: "relative" }}>
                  <TextField
                    variant="standard"
                    label="پسورد"
                    type={visibility ? "text" : "password"}
                    InputLabelProps={{ sx: { marginLeft: "90%" } }}
                    sx={passwordError ? inputErrorStyles : {}}
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "0px",
                      left: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setVisibility((prev) => !prev)}
                  >
                    {visibility ? <VisibilityOff /> : <Visibility />}
                  </Box>
                  {passwordError && (
                    <Typography
                      sx={{
                        color: "#f03637",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      پسورد خود را وارد کنید
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        sx={{
                          "&.Mui-checked": {
                            color: "#f03637",
                          },
                        }}
                      />
                    }
                    sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                    label="من را به خاطر بسپار"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ height: "46px", borderRadius: "10px" }}
                  type={"submit"}
                >
                  ورود
                </Button>
              </Grid>
            </Grid>
          </form>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              component={"h6"}
              sx={forgetPassStyles}
              onClick={() => setModalType("reset")}
            >
              رمز عبور خود را فراموش کرده اید؟
            </Typography>
          </Box>
          <FormFooter>
            <Typography component="span" sx={{ marginLeft: "3px" }}>
              حساب کاربری ندارید؟
            </Typography>
            <Button
              variant="contained"
              onClick={() => setModalType("register")}
              sx={{ borderRadius: "10px" }}
            >
              ثبت نام کنید
            </Button>
          </FormFooter>
          <Box
            className="close-button"
            onClick={() => {
              setOpenLogin(false);
              if (location.asPath == "/?login=open") {
                location.push("/");
              }
            }}
          >
            <CloseRounded fontSize="large" />
          </Box>
        </Box>
      </FormWrapper>
    </>
  );
}

export default Login;
