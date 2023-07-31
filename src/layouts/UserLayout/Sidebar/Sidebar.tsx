import React, { Fragment } from "react";
import {
  Divider,
  Icon,
  List,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { userSidebarOptions } from "../data";
import SidebarTop from "./SidebarTop/SidebarTop";
import { UserItem } from "../../../../styles/user";
import { useRouter } from "next/router";
import MyOrders from "components/UserStatus/MyOrders/MyOrders";

const Sidebar = () => {
  const router = useRouter();

  return (
    <>
      <SidebarTop />
      <Divider sx={{ borderColor: "common.panelBorderGrey" }} />

      <MyOrders sidebar={true} />
      <Divider
        sx={{ borderColor: "common.panelBorderGrey", display: { md: "none" } }}
      />
      <List>
        {userSidebarOptions.map(({ id, title, route, icon }) => (
          <Fragment key={id}>
            {title === "settings" && <Divider sx={{ marginY: "10px" }} />}
            <UserItem className={title === "وضعیت" ? "hidden" : ""}>
              <Box
                onClick={() => router.push(`${route}`)}
                className={`${route === router.asPath && "active"} link`}
              >
                <ListItemIcon>{React.createElement(icon)}</ListItemIcon>
                <ListItemText
                  sx={{ textAlign: "start" }}
                  primaryTypographyProps={{
                    fontSize: "16px",
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                  primary={title}
                />
              </Box>
            </UserItem>
          </Fragment>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
