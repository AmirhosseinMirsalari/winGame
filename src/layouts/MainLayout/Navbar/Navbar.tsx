import { forwardRef, Fragment, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  useMediaQuery,
  Fade,
  Collapse,
  Modal,
} from "@mui/material";
import { navbarItems } from "./data";
import { useTheme } from "@mui/material/styles";
import { MenuRounded, KeyboardArrowDown } from "@mui/icons-material";
import {
  AntTab,
  AntTabs,
  appBarStyles,
  menuIconStyles,
  ShopMenuWrapper,
  tabLinkStyles,
} from "./styles";
import TabDrawer from "./TabDrawer/TabDrawer";
import ShopDrawer from "./ShopDrawer/ShopDrawer";
import SearchBar from "./SearchBar/SearchBar";
import ShopMenu from "./ShopMenu/ShopMenu";
import Icons from "./Icons/Icons";
import Link from "next/link";
import { useRouter } from "next/router";
import ResetPassword from "components/ResetPassword/ResetPassword";
import Login from "components/Login/Login";
import Register from "components/Register/Register";
import { useAppSelector } from "redux/store";

function Navbar() {
  const { user } = useAppSelector((state) => state.reducer.auth);
  const router = useRouter();

  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openCompareModal, setOpenCompareModal] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const [collapse, setCollapse] = useState(true);
  const [modalType, setModalType] = useState("login");

  const [displayDrawer, setDisplayDrawer] = useState({
    left: false,
    right: false,
  });
  const [openDropdown, setOpenDropdown] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const userPath = router.asPath.includes("user");
  const tabRoutes = ["/", "/shop", "/blog", "/contact-us", "/about-us"];
  let tabValue = tabRoutes.find((v) => v === router.asPath);

  type Anchor = "left" | "right";

  const toggleDrawer = (anchor: Anchor, open: boolean) => () => {
    
      setDisplayDrawer({ ...displayDrawer, [anchor]: open });
    
  };
  const openSearchBarHandler = () => {
    setOpenSearchBar((prevOpenSearchBar) => !prevOpenSearchBar);
  };

  type Modal = "login" | "register" | "reset";


  useEffect(() => {
    let lastScroll = window.scrollY;
    window.addEventListener("scroll", () => {
      if (window.scrollY > 180 && lastScroll < window.scrollY && matches) {
        setCollapse(false);
        setOpenDropdown(false);
      } else {
        setCollapse(true);
      }
      lastScroll = window.scrollY;
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  useEffect(()=>{
    setOpenSearchBar(false)
  },[matches]);

  useEffect(() => {
    if (router.asPath == "/?login=open") {
      setOpenLogin(true);
      setModalType("login");
    }
    if (router.asPath == "/?login=open" && user) {
      setOpenLogin(false);
      router.push("/");
    }
  }, [router.asPath]);

  return (
    <Fragment>
      <AppBar sx={appBarStyles}>
        <Collapse in={userPath ? true : collapse} timeout={600}>
          <Container maxWidth={"xl"} sx={{ position: "relative" }}>
            <Toolbar sx={{ justifyContent: "space-between" }} disableGutters>
              <Box>
                <Box onClick={toggleDrawer("left", true)}>
                  <MenuRounded sx={menuIconStyles} />
                </Box>
              </Box>
              <Box sx={{ marginRight: { sx: "0", md: "30px" },marginLeft: { sx: "0", md: "40px" },cursor:"pointer" }}>
                <Link href="/" onClick={() => setOpenSearchBar(false)}>
                  <img
                    src="https://s8.uupload.ir/files/logo_c024.png"
                    alt="winGame-logo"
                    width={150}
                    style={{padding:"10px 0"}}
                  />
                </Link>
              </Box>

              {!openSearchBar && (
                <Fragment>
                  {matches && (
                    <AntTabs value={tabValue ? tabValue : false}>
                      {navbarItems.map((item) => (
                        <AntTab
                          key={item.id}
                          label={item.name}
                          component={forwardRef((props, ref) => (
                            <Box
                              sx={{
                                padding: "0 !important",
                                "&:hover ": {
                                  zIndex: 99,
                                  a: {
                                    color:
                                      tabValue === item.route
                                        ? ""
                                        : "common.digitaRed",
                                  },
                                  "& .shop-menu": {
                                    display:
                                      item.name === "shop" ? "block" : "none",
                                  },
                                },
                                overflow: "visible !important",
                              }}
                              {...props}
                              ref={ref}
                            >
                              <Link href={item.route}>
                                <Box sx={tabLinkStyles}>
                                  <Box>{item.name}</Box>
                                  {item.name === "shop" && (
                                    <KeyboardArrowDown />
                                  )}
                                </Box>
                              </Link>

                              {item.name === "shop" && (
                                <ShopMenuWrapper className={"shop-menu"}>
                                  <ShopMenu />
                                </ShopMenuWrapper>
                              )}
                            </Box>
                          ))}
                          value={item.route}
                        />
                      ))}
                    </AntTabs>
                  )}
                  <Icons
                    openSearchBarHandler={openSearchBarHandler}
                    setOpenLogin={setOpenLogin}
                    matches={matches}
                    toggleDrawer={toggleDrawer}
                    setOpenCompareModal={setOpenCompareModal}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                  />
                </Fragment>
              )}
              <Fade style={{ display: openSearchBar ? "block" : "none" }} in={openSearchBar}>
                <Box width={"100%"}>
                  <SearchBar openSearchBarHandler={openSearchBarHandler} />
                </Box>
              </Fade>
            </Toolbar>
          </Container>
          {/*--------------------- drawers ---------------- */}
          <ShopDrawer
            displayDrawer={displayDrawer}
            toggleDrawer={toggleDrawer}
          />
          <TabDrawer
            displayDrawer={displayDrawer}
            toggleDrawer={toggleDrawer}
          />
        </Collapse>
      </AppBar>
      <Box sx={{ marginTop: { xs: "56px", sm: "64px", md: "90px" } }}></Box>
      <Modal
        open={openLogin}
        onClose={() => {
          setOpenLogin(false);
          router.push("/");
        }}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div>
          {modalType === "login" && (
            <Login setOpenLogin={setOpenLogin} setModalType={setModalType} />
          )}
          {modalType === "register" && (
            <Register setOpenLogin={setOpenLogin} setModalType={setModalType} />
          )}
          {modalType === "reset" && (
            <ResetPassword
              setOpenLogin={setOpenLogin}
              setModalType={setModalType}
            />
          )}
        </div>
      </Modal>
    </Fragment>
  );
}

export default Navbar;
