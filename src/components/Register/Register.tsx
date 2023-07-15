import { FormEvent, useState, useRef } from "react";
import { CloseRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSignUpMutation } from "redux/auth/authApi";
import { setCredentials } from "redux/auth/authSlice";
import {
  errorStyles,
  FormFooter,
  FormWrapper,
  inputErrorStyles,
} from "../Login/styles";
import Header from "../Login/Header/Header";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import { successMessage } from "utils/toastMessages";

type Modal = "login" | "register" | "reset";

type Props = {
  setModalType?: any;
  setOpenLogin?: any;
};

function Register({ setModalType, setOpenLogin }: Props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [signUp, { isLoading }] = useSignUpMutation();
  const loadingRef = useRef<any>(null);
  const location: any = useRouter();


  const dispatch = useDispatch();

  //* username validation
  let usernameIsValid = true;
  let usernameErrorMessage = "";

  if (!/^[a-zA-Z0-9]+$/.test(enteredUsername)) {
    usernameErrorMessage = "یوزرنیم معتبر وارد کنید";
    usernameIsValid = false;
  }
  if (enteredUsername.trim() === "") {
    usernameErrorMessage = "انتخاب یوزرنیم اجباری است";
    usernameIsValid = false;
  }
  const usernameError = !usernameIsValid && usernameTouched;

  //* email validation
  let emailIsValid = true;
  let emailErrorMessage = "";

  if (!/^\S+@\S+\.\S+$/.test(enteredEmail)) {
    emailErrorMessage = "ایمیل معتبر وارد کنید";
    emailIsValid = false;
  }
  if (enteredEmail.trim() === "") {
    emailErrorMessage = "انتخاب ایمیل اجباری است";
    emailIsValid = false;
  }
  const emailError = !emailIsValid && emailTouched;

  //* password validation
  let passwordErrorMessage = ["پسورد باید حداقل شامل"];
  let passwordIsValid = true;

  if (!/[a-zA-Z0-9]{6,}/.test(enteredPassword)) {
    passwordErrorMessage.push("6 کاراکتر باشد");
    passwordIsValid = false;
  }
  if (!/(?=.*[A-Z])/.test(enteredPassword)) {
    passwordErrorMessage.push("یک حرف بزرگ باشد");
    passwordIsValid = false;
  }
  if (!/(?=.*\d)/.test(enteredPassword)) {
    passwordErrorMessage.push("یک عدد باشد");
    passwordIsValid = false;
  }
  const passwordError = !passwordIsValid && passwordTouched;

  //* confirm password validation
  let confirmPasswordErrorMessage = "";
  let confirmPasswordIsValid = true;

  if (enteredPassword !== enteredConfirmPassword) {
    confirmPasswordErrorMessage = "پسورد وارد شده یکسان نیست";
    confirmPasswordIsValid = false;
  }
  if (enteredConfirmPassword.trim() === "") {
    confirmPasswordErrorMessage = "پسورد خود را مجددا وارد کنید";
    confirmPasswordIsValid = false;
  }
  const confirmPasswordError =
    !confirmPasswordIsValid && confirmPasswordTouched;

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    loadingRef?.current.staticStart();

    if (
      !usernameIsValid &&
      !emailIsValid &&
      !passwordIsValid &&
      !confirmPasswordIsValid
    ) {
      loadingRef?.current.complete();

      return;
    }
    try {
      const userCredentials = {
        userName: enteredUsername,
        email: enteredEmail,
        password: enteredPassword,
      };
      const response = await signUp(userCredentials).unwrap();

      dispatch(
        setCredentials({ user: null, role: null, email: response.data.email })
      );
      loadingRef?.current.complete();

      setOpenLogin("login");
      setModalType("login")
      successMessage("حساب شما با موفقیت ساخته شد");

    } catch (err: any) {
      setErrorMessage(err?.data?.message);
      console.log(err);
    }
  };
  return (
    <>
      <LoadingBar color="#f03637" ref={loadingRef} />
      <FormWrapper>
        <Box sx={{ position: "relative" }}>
          <Header
            title={"ساخت حساب کاربری"}
            subtitle={"یک حساب کاربری برای خود ایجاد کنید"}
          />
          {errorMessage && (
            <Box sx={errorStyles}>
              <Typography component="span"> ارور:{errorMessage}</Typography>
            </Box>
          )}
          <form onSubmit={submitHandler}>
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    variant="standard"
                    label="یوزرنیم"
                    sx={usernameError ? inputErrorStyles : {}}
                    InputLabelProps={{sx:{marginLeft:"90%"}}}
                    value={enteredUsername}
                    onChange={(e) => setEnteredUsername(e.target.value)}
                    onBlur={() => setUsernameTouched(true)}
                  />
                  {usernameError && (
                    <Typography
                      sx={{
                        color: "#f03637",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {usernameErrorMessage}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    variant="standard"
                    label="آدرس ایمیل"
                    sx={emailError ? inputErrorStyles : {}}
                    InputLabelProps={{sx:{marginLeft:"80%"}}}
                    value={enteredEmail}
                    onChange={(e) => setEnteredEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                  />
                  {emailError && (
                    <Typography
                      sx={{
                        color: "#f03637",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {emailErrorMessage}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    variant="standard"
                    label="پسورد"
                    type={"password"}
                    sx={passwordError ? inputErrorStyles : {}}
                    InputLabelProps={{sx:{marginLeft:"93%"}}}
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                  />
                  {passwordError && (
                    <Typography
                      sx={{
                        color: "#f03637",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {passwordErrorMessage.join(" ")}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    variant="standard"
                    label="تکرار پسورد"
                    type={"password"}
                    sx={confirmPasswordError ? inputErrorStyles : {}}
                    value={enteredConfirmPassword}
                    InputLabelProps={{sx:{marginLeft:"80%"}}}
                    onChange={(e) => setEnteredConfirmPassword(e.target.value)}
                    onBlur={() => setConfirmPasswordTouched(true)}
                  />
                  {confirmPasswordError && (
                    <Typography
                      sx={{
                        color: "#f03637",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {confirmPasswordErrorMessage}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ height: "46px",borderRadius:"10px" }}
                  type={"submit"}
                >
                  ثبت نام
                </Button>
              </Grid>
            </Grid>
          </form>

          <FormFooter>
            <Typography component="span">عضو سایت هستید؟</Typography>
            <Button variant="contained" sx={{borderRadius:"10px",marginRight:"5px"}} onClick={() => setModalType("login")}>
              ورود
            </Button>
          </FormFooter>
          <Box
            className="close-button"
            onClick={() => {
              setOpenLogin(false);
              location.push("/");
            }}
          >
            <CloseRounded fontSize="large" />
          </Box>
        </Box>
      </FormWrapper>
    </>
  );
}

export default Register;
