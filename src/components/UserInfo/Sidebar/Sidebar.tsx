import { Box, List, ListItemText } from "@mui/material";
import { PanelItem } from "layouts/PanelLayout/styles";

const userSettingItems = [
  {
    id: 1,
    title: "general",
    text: "اطلاعات عمومی",
  },
  {
    id: 2,
    title: "password",
    text: "رمز عبور",
  },
];
interface Props {
  activePageHandler: (page: string) => () => void;
  activePage: string;
}
function Sidebar({ activePageHandler, activePage }: Props) {
  return (
    <Box
      sx={{
        paddingX: { lg: "15px" },
        marginRight: { lg: "15px" },
        borderRight: { lg: "1px solid " },
        borderBottom: { xs: "1px solid ", lg: "none" },
        borderColor: {
          xs: "common.panelHoverDarkGrey",
          lg: "common.panelHoverDarkGrey",
        },
        height: "100%",
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: { xs: "row", lg: "column" },
          gap: { xs: "10px", lg: "0" },
        }}
      >
        {userSettingItems.map(({ id, title, text }) => (
          <PanelItem key={id}>
            <Box
              className={`${title === activePage && "active"} link`}
              onClick={activePageHandler(title)}
            >
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  textAlign: "start"
                }}
                primary={text}
              />
            </Box>
          </PanelItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
