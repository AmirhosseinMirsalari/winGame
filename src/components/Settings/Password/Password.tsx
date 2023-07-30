import { useState, FormEvent } from "react";
import { FormControl, Grid, Typography } from "@mui/material";
import { PButton, PFormLabel, PTextField } from "../../../../styles/panel";
import { useUpdateUserMutation } from "redux/user/userApi";
import { successMessage } from "utils/toastMessages";

interface Props {
  role: string;
  id: string;
}

function Password({ role, id }: Props) {
  const [enteredCurrentPass, setEnteredCurrentPass] = useState("");
  const [enteredNewPass, setEnteredNewPass] = useState("");
  const [enteredConfirmPass, setEnteredConfirmPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [updateUser] = useUpdateUserMutation();

  const reset = () => {
    setEnteredCurrentPass("");
    setEnteredNewPass("");
    setEnteredConfirmPass("");
    setErrorMessage("");
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (
      enteredCurrentPass.trim().length === 0 ||
      enteredNewPass.trim().length === 0 ||
      enteredNewPass.trim() !== enteredConfirmPass.trim()
    ) {
      setErrorMessage("ارور: فیلد ها را درست پر کنید");
      return;
    }

    const newUser = {
      password: enteredNewPass,
    };
    try {
      await updateUser({
        user: newUser,
        id,
        path: role,
      }).unwrap();

      successMessage("تعویض پسورد موفقیت آمیز بود");
      reset();
    } catch (err: any) {
      console.log(err);
      setErrorMessage(err?.message);
    }
  };
  return (
    <Grid container spacing={4} component={"form"} onSubmit={submitHandler}>
      {errorMessage && (
        <Grid item xs={12}>
          <Typography color="error">{errorMessage}</Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <PFormLabel>پسورد کنونی</PFormLabel>
          <PTextField
            value={enteredCurrentPass}
            onChange={(e) => setEnteredCurrentPass(e.target.value)}
            placeholder="پسورد کنونی خود را وارد کنید"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <PFormLabel>پسورد جدید</PFormLabel>
          <PTextField
            value={enteredNewPass}
            onChange={(e) => setEnteredNewPass(e.target.value)}
            placeholder="پسورد جدید خود را وارد کنید"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <PFormLabel>تکرار پسورد جدید</PFormLabel>
          <PTextField
            value={enteredConfirmPass}
            onChange={(e) => setEnteredConfirmPass(e.target.value)}
            placeholder="پسورد جدید را تکرار کنید"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <PButton variant="contained" type="submit">
          بازگردانی پسورد
        </PButton>
      </Grid>
    </Grid>
  );
}

export default Password;
