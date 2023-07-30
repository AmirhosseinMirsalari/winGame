import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";
import { ArrowBack } from "@mui/icons-material";
import { useAppSelector } from "redux/store";
import Link from "next/link";
import { CardWrapper, wrapper } from "../../../styles/user";
import General from "components/Settings/General/General";
import Password from "components/Settings/Password/Password";
import Head from "next/head";

const PersonalInfo = () => {
  const { user } = useAppSelector((state) => state.reducer.auth);

  const [activePage, setActivePage] = useState("general");

  const activePageHandler = (page: string) => () => {
    setActivePage(page);
  };

  return (
    <Box sx={wrapper}>
      <Head>
        <title>وین گیم | اطلاعات شخصی کاربر</title>
      </Head>
      <CardWrapper>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Link href="/user">
            <Box
              sx={{
                display: { md: "none" },
                textDecoration: "none",
                color: "common.digitaBlack",
              }}
            >
              <ArrowBack />
            </Box>
          </Link>

          <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
            اطلاعات شخصی
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} lg={3} mb={4}>
            <Sidebar
              activePageHandler={activePageHandler}
              activePage={activePage}
            />
          </Grid>
          <Grid item xs={12} lg={9}>
            {activePage === "general" && <General user={user!} />}
            {activePage === "password" && (
              <Password id={user?._id!} role={user?.role!} />
            )}
          </Grid>
        </Grid>
      </CardWrapper>
    </Box>
  );
};

export default PersonalInfo;
