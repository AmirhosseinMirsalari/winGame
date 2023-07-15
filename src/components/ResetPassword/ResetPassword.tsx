import { FormEvent, useState } from "react";
import { CloseRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FormFooter, FormWrapper, inputErrorStyles } from "../Login/styles";
import Header from "../Login/Header/Header";
import { useRouter } from "next/router";

type Modal = "login" | "register" | "reset";
type Props = {
  setModalType?: any;
  setOpenLogin?: any;
};
function ResetPassword({ setModalType, setOpenLogin }: Props) {
  const location = useRouter()
  const [enteredUsername, setEnteredUsername] = useState("");
  const [validationError, setValidationError] = useState(false);

  let usernameIsValid = enteredUsername.trim() !== "";
  const usernameError = !usernameIsValid && validationError;

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    setModalType("login")

    if (!usernameIsValid) {
      setValidationError(true);
      return;
    }
  };
  return (
    <FormWrapper>
      <Box sx={{ position: "relative" }}>
        <Header title={"فراموشی رمز عبور"} subtitle={"رمز عبور خود را بازگردانی کنید"} />

        {/* <Box sx={errorStyles}>
          <Typography component="span">
            ERROR: Username or password incorrect!
          </Typography>
        </Box> */}
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  variant="standard"
                  label="یوزرنیم یا ایمیل"
                  sx={usernameError ? inputErrorStyles : {}}
                  InputLabelProps={{sx:{marginLeft:"70%"}}}
                  value={enteredUsername}
                  onChange={(e) => setEnteredUsername(e.target.value)}
                />
                {usernameError && (
                  <Typography
                    sx={{ color: "#f03637", fontSize: "14px", fontWeight: 500 }}
                  >
                    این فیلد الزامی است
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                sx={{ height: "46px" }}
                type={"submit"}
              >
                بازگردانی پسورد
              </Button>
            </Grid>
          </Grid>
        </form>

        <FormFooter>
          {/* <Typography component="span">بازگشت به</Typography> */}
          <Button variant="contained" onClick={() => setModalType("login")}>
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
  );
}

export default ResetPassword;
