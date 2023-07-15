import { Dispatch, Fragment, SetStateAction, useRef } from "react";
import {
  ArrowDropDown,
  LocalGroceryStoreOutlined,
  LoginOutlined,
  PersonOutline,
  SearchOutlined,
} from "@mui/icons-material";
import { Badge, Box } from "@mui/material";
import { iconsBadgeStyles, iconsWrapperStyles, IconWrapper } from "../styles";
import ShopCart from "../ShopCart/ShopCart";
import UserDropDown from "../UserDropDown/UserDropDown";
import { useAppSelector } from "redux/store";
import { useGetAllCartItemQuery } from "redux/cart/cartApi";
import { useRouter } from "next/router";

const navbarIcons = {
  marginLeft: "12px",
  transition: "all 200ms",
  cursor: "pointer",
  fontSize: "28px",
  "&:hover": { color: "#f03637" },
};
type Anchor = "left" | "right";

interface Props {
  openSearchBarHandler: () => void;
  setOpenLogin: any;
  toggleDrawer: (anchor: Anchor, open: boolean) => () => void;
  matches: boolean;
  setOpenCompareModal: Dispatch<SetStateAction<boolean>>;
  openDropdown: boolean;
  setOpenDropdown: Dispatch<SetStateAction<boolean>>;
}
function Icons({
  openSearchBarHandler,
  setOpenLogin,
  toggleDrawer,
  matches,
  setOpenCompareModal,
  openDropdown,
  setOpenDropdown,
}: Props) {
  const userDropRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();
  const { user, role } = useAppSelector((state) => state.reducer.auth);
  const { cartList } = useAppSelector((state) => state.reducer.cart);

  const { data: cartData } = useGetAllCartItemQuery(undefined, {
    skip: !!!user,
  });
  const cart = cartData?.data?.products ?? [];

  const cartItems = user ? cart : cartList;

  const showCartMenu =
    matches &&
    cartItems.length !== 0 &&
    navigate.asPath !== "/checkout" &&
    navigate.asPath !== "/cart";

  const handleToggle = () => {
    if (matches) {
      setOpenDropdown((prevOpen) => !prevOpen);
    } else if (role === "admin" || role === "superAdmin") {
      navigate.push("/panel/dashboard");
    } else {
      navigate.push("/user");
    }
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      userDropRef.current &&
      userDropRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpenDropdown(false);
  };

  const shopClickHandler = () => {
    if (!matches) {
      toggleDrawer("right", true)();
    } else {
      navigate.push("/cart");
    }
  };
  return (
    <>
      <Box sx={iconsWrapperStyles}>
        <IconWrapper onClick={openSearchBarHandler}>
          <Badge showZero sx={iconsBadgeStyles}>
            <SearchOutlined color="primary" sx={navbarIcons} />
          </Badge>
        </IconWrapper>
        <IconWrapper
          sx={{
            "&:hover .shop-cart": {
              display: showCartMenu ? "inline-block" : "none",
            },
          }}
        >
          <Box onClick={shopClickHandler} sx={{ display: "flex" }}>
            <Badge
              badgeContent={cartItems.length}
              overlap="circular"
              color="error"
              sx={{
                margin: "auto",
              }}
            >
              <LocalGroceryStoreOutlined
                color="primary"
                sx={{
                  marginLeft: "12px",
                  transition: "all 200ms",
                  cursor: "pointer",
                  fontSize: "28px",
                }}
                className="local-grocery-icon"
              />
            </Badge>
          </Box>
          <ShopCart />
        </IconWrapper>
        {user && role ? (
          <Fragment>
            <IconWrapper
              ref={userDropRef}
              id="user-drop-button"
              aria-controls={openDropdown ? "user-drop-menu" : undefined}
              aria-expanded={openDropdown ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Badge showZero sx={{ margin: "auto" }}>
                <PersonOutline color="primary" sx={navbarIcons} />
                <ArrowDropDown
                  color="primary"
                  sx={{
                    transition: "all 200ms",
                    cursor: "pointer",
                    fontSize: "28px",
                    "&:hover": { color: "#f03637" },
                    marginRight:"-15px",
                    display: { xs: "none", md: "inline-block" },
                  }}
                />
              </Badge>
            </IconWrapper>
            <UserDropDown
              openDropdown={openDropdown}
              handleClose={handleClose}
              userDropRef={userDropRef}
              user={user}
              role={role}
            />
          </Fragment>
        ) : (
          <IconWrapper onClick={() => setOpenLogin(true)}>
            <Badge
              showZero
              sx={{ ...iconsBadgeStyles, display: "inline-flex" }}
            >
              <LoginOutlined color="primary" sx={navbarIcons} />
            </Badge>
          </IconWrapper>
        )}
        
      </Box>
    </>
  );
}

export default Icons;
