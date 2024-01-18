import { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  ListItem,
} from "@mui/material";
import { FilterTitleWrapper, FilterListItemText } from "../styles";
import ColorFilter from "../ColorFilter/ColorFilter";
import PriceFilter from "../PriceFilter/PriceFilter";
import { productCategories } from "../data";
import { useRouter } from "next/router";

type ShopFiltersDrawerProps = {
  displayDrawer: boolean;
  toggleDrawer: (open: boolean) => void;
  addQueryParams: (filter: string, name: string) => () => void;
  categoryQueryParams: string | null;
};

function FiltersDrawer({
  displayDrawer,
  toggleDrawer,
  addQueryParams,
  categoryQueryParams,
}: ShopFiltersDrawerProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const selectedCategories = categoryQueryParams?.split("/");

  useEffect(() => {
    // const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]) || ''
    // const categoryQueryParam = searchParams?.get('category')
    // if (categoryQueryParam) {
    //   setSelectedCategory(categoryQueryParam.replace('/', ''))
    // }
    toggleDrawer(false);
  }, [router.asPath]);

  const selectedCategoryHandler = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
    router.push(`/shop?category=/${event.target.value}`, undefined, {
      shallow: false,
    });
  };

  return (
    <Drawer
      anchor="left"
      open={displayDrawer}
      onClose={() => toggleDrawer(false)}
    >
      <Box
        sx={{
          bgcolor: "#f7f7f7",
          height: "100%",
          width: "300px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <FilterTitleWrapper>
            <Typography
              component={"h4"}
              variant="body1"
              color="primary"
              fontWeight={600}
            >
              دسته بندی محصولات
              <IconButton
                onClick={() => toggleDrawer(false)}
                sx={{
                  marginRight: "80px",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              >
                x
              </IconButton>
            </Typography>
          </FilterTitleWrapper>
          <FormControl
            sx={{ width: { xs: "100%" }, marginTop: "20px" }}
            size="small"
          >
            <Select
              variant="outlined"
              displayEmpty
              value={selectedCategory}
              onChange={selectedCategoryHandler}
            >
              <MenuItem value="">همه محصولات</MenuItem>

              {productCategories.map(({ id, name }) => {
                let selected = categoryQueryParams
                  ? selectedCategories?.indexOf(name) === -1
                  : true;

                return (
                  <ListItem
                    key={id}
                    sx={{
                      position: "relative",
                      paddingY: "4px",
                    }}
                  >
                    <FilterListItemText
                                        onClick={addQueryParams("category", name)}

                      sx={{
                        color: selected ? "" : "#f03637",
                        direction: "ltr",
                      }}
                    >
                      {name}
                    </FilterListItemText>
                  </ListItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <ColorFilter drawer={false} addQueryParams={addQueryParams} />
        <PriceFilter drawer={false} />
      </Box>
    </Drawer>
  );
}

export default FiltersDrawer;
{
  /* <MenuItem key={index} value={`${name}`}>
                  {name}
                </MenuItem> */
}
