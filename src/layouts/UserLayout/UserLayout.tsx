import { Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import { Aside, Main, UserWrapper } from "../../../styles/user";
import { useAppSelector } from "redux/store";
import Loading from "components/Loading/Loading";

interface LayoutProps {
  children: React.ReactNode;
}

function UserLayout(props: LayoutProps) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.reducer.auth);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  if (!user) {
    router.push("/?login=open");
    return <Loading full />;
  }
  if (user) {
    return (
      <>
        <Head>
          <title>وین گیم | پنل کاربری</title>
        </Head>
        <UserWrapper maxWidth={"xl"}>
          <Box>
            {matches ? (
              <Aside className="aside">
                <Sidebar />
              </Aside>
            ) : (
              router.pathname === "/user" && (
                <Aside className="aside">
                  <Sidebar />
                </Aside>
              )
            )}
            <Main className="main">
              <Box>{props.children}</Box>
            </Main>
          </Box>
        </UserWrapper>
      </>
    );
  }
}

export default UserLayout;
