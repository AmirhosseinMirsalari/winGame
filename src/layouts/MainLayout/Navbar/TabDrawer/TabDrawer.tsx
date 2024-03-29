import { Fragment, useEffect } from "react";
import { CloseRounded, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { navbarItems } from "../data";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type Anchor = "left" | "right";
type TabDrawerProps = {
  displayDrawer: { left: boolean; right: boolean };
  toggleDrawer: (anchor: Anchor, open: boolean) => () => void;
};

function TabDrawer({ displayDrawer, toggleDrawer }: TabDrawerProps) {
  const navigate = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const listItemHandler = (route: string) => {
    toggleDrawer("left", false)();
    navigate.push(route);
  };

  useEffect(() => {
    toggleDrawer("left", false)();

  }, [matches]);
  return (
    <Drawer
      anchor="left"
      open={displayDrawer["left"]}
      onClose={toggleDrawer("left", false)}
    >
      <Box
        sx={{
          backgroundColor: "#f03637",
          display: "flex",
          alignItems: "center",
        }}
        paddingY={2}
      >
        <Typography
          color={"white"}
          variant="body2"
          sx={{
            textTransform: "uppercase ",
            marginLeft: "15px",
            marginRight: "10px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={toggleDrawer("left", false)}
        >
          <CloseRounded sx={{ color: "white", marginLeft: "10px" }} />
          دسترسی سریع
        </Typography>
      </Box>
      <Box
        sx={{
          width: "90%",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#EAEAEA",
          margin: "25px auto",
        }}
      >
        <InputBase
          placeholder="جستجو"
          sx={{
            width: "100%",
            padding: "6px",
            borderRadius: "30px",
          }}
        />
        <SearchOutlined
          sx={{
            cursor: "pointer",
            marginRight: "4px",
            marginLeft: "4px",
          }}
        />
      </Box>
      <List>
        {navbarItems.map((item) => (
          <Fragment key={item.id}>
            <ListItem onClick={() => listItemHandler(item.route)}>
              <ListItemText
                primary={item.name}
                sx={{
                  width: { xs: "200px", sm: "300px" },
                  cursor: "pointer",
                  color: navigate.asPath === item.route ? "#f03637" : "",
                  textTransform: "capitalize",
                  textAlign: "start",
                  "&:hover": { color: "#f03637" },
                }}
              />
            </ListItem>
            <Divider sx={{ borderColor: "rgba(0,0,0,0.08)" }} />
          </Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default TabDrawer;
