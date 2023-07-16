import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    height: { xs: "50px", md: "40px" },
  },
};
function Form() {
  const [enteredName, setEnteredName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const nameIsValid = enteredName.trim() !== "";

  const emailRegex = /^\S+@\S+\.\S+$/;
  const emailIsValid = emailRegex.test(enteredEmail);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (!emailIsValid && !nameIsValid) {
      return;
    }
  };
  return (
    <Box
      sx={{ backgroundColor: "#F5F5F5", padding: "30px", borderRadius: "3px" }}
    >
      <Typography
        variant="h4"
        fontWeight={600}
        marginBottom={4}
        sx={{ fontSize: { xs: "28px", sm: " 32px" } }}
      >
        فرم تماس با ما
      </Typography>
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel
                color="primary"
                sx={{ fontSize: "15px", color: "#333333", display: "flex" }}
              >
                نام شما
                <Typography
                  component={"span"}
                  sx={{ color: "#f03637", marginLeft: "2px" }}
                >
                  *
                </Typography>
              </FormLabel>
              <TextField
                placeholder="نام خود را وارد کنید"
                sx={inputStyles}
                value={enteredName}
                onChange={(e) => setEnteredName(e.target.value)}
                onBlur={() => setNameTouched(true)}
              />
              {!nameIsValid && nameTouched && (
                <Typography sx={{ color: "#f03637", marginTop: "2px" }}>
                  وارد کردن نام الزامیست
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel
                color="primary"
                sx={{ fontSize: "15px", color: "#333333", display: "flex" }}
              >
                ایمیل شما
                <Typography
                  component={"span"}
                  sx={{ color: "#f03637", marginLeft: "2px" }}
                >
                  *
                </Typography>
              </FormLabel>
              <TextField
                placeholder="ایمیل خود را وارد کنید"
                sx={inputStyles}
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
              />
              {!emailIsValid && emailTouched && (
                <Typography sx={{ color: "#f03637", marginTop: "2px" }}>
                  لطفا ایمیل خود را به صورت صحیح وارد کنید
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel
                color="primary"
                sx={{ fontSize: "15px", color: "#333333" }}
              >
                موضوع
              </FormLabel>
              <TextField placeholder="موضوع پیغام" sx={inputStyles} />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel
                color="primary"
                sx={{ fontSize: "15px", color: "#333333" }}
              >
                متن پیام
              </FormLabel>
              <TextField
                placeholder="با جان و دل می شنویم"
                multiline
                rows={6}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{
                width: { xs: "100%", sm: "35%" },
                height: "50px",
                borderRadius: "25px",
              }}
            >
              ارسال پیام
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default Form;
