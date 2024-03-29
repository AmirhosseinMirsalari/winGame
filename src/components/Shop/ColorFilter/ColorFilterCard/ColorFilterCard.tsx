import { Box, Checkbox, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

type ColorFilterProps = {
  isChecked: boolean;
  drawer: boolean;
  color: string;
  labelId: string;
  addQueryParams: (filter: string, name: string) => () => void;
};
function ColorFilterCard({ isChecked, color, labelId, addQueryParams, drawer }: ColorFilterProps) {
  return (
    <ListItem
      sx={{
        "&:hover": {
          color: "#f03637",
          backgroundColor: drawer ? "white" : "#f7f7f7",
          cursor: "pointer",
          transition: "all 200ms ease-in",
          "& .filter-color-text": {
            color: "#f03637",
          },
          "& .filter-color-badge": {
            border: "1px solid #f03637",
            color: isChecked ? "white" : "#f03637 ",
            bgcolor: isChecked ? "#f03637 " : "white",
          },
        },
      }}
      disablePadding
      onClick={addQueryParams("color", color)}
    >
      <ListItemText
        id={labelId}
        primary={
          <Typography
            sx={{
              textTransform: "capitalize",
              color: "#333333",
              fontSize: "13px",
              transition: "all 200ms ease-in",
              textAlign:"start",
            }}
            className="filter-color-text"
          >
            {color}
          </Typography>
        }
      />
      <ListItemIcon sx={{ minWidth: 0 }}>
        <Checkbox
          sx={{
            padding: "0 8px 0 0 ",
            "&.Mui-checked": {
              color: "#f03637  ",
            },
          }}
          edge="start"
          checked={isChecked}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": labelId }}
        />
      </ListItemIcon>
      
    </ListItem>
  );
}

export default ColorFilterCard;
