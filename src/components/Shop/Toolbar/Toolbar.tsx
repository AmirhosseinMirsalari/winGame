import { useState,useEffect } from "react";
import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { FilterList, GridView, TableRows } from "@mui/icons-material";
import { ToolbarButton } from "../styles";
import { useRouter } from "next/router";

type ShopToolbarProps = {
  matches: boolean;
  toggleDrawer: (open: boolean) => void;
  setSelectedLayout: any;
  selectedLayout: { grid: boolean; list: boolean };
  sortQueryParams: string | null;
  productsPerPage:number;
  setProductsPerPage:any
};

function Toolbar({ matches, toggleDrawer, setSelectedLayout, selectedLayout, sortQueryParams,productsPerPage,setProductsPerPage }: ShopToolbarProps) {
  const router = useRouter()
  
  const [selectedSorting, setSelectedSorting] = useState<string>(router.query.sort as string || '')
  
  useEffect(() => {
      if (router.asPath=="/shop") {
    setSelectedSorting("")
  }
    const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]) || ""
    const sortQueryParam = searchParams?.get('sort')
    if (sortQueryParam) {
      setSelectedSorting(sortQueryParam)
    }
  }, [router.asPath])


  const selectedSortingHandler = (event: SelectChangeEvent) => {
    const value = event.target.value
    setSelectedSorting(value)
    if (value) {
      router.push(`/shop?sort=${value}`, undefined, { shallow: true })
    } else {
      router.push('/shop', undefined, { shallow: true })
    }
  }
  
  return (
    <Box
      sx={{
        borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
        paddingBottom: "15px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Button
          startIcon={<FilterList sx={{ fontSize: "25px",marginLeft:"10px" }} />}
          onClick={() => toggleDrawer(true)}
          sx={{
            "&:hover": { color: "#f03637", backgroundColor: "white" },
            cursor: "pointer",
            transition: "all 100ms ease-in",
            display: { xs: "flex", md: "none" },
            marginLeft: "6px",
            fontSize: "18px",
          }}
        >
         فـیلـتر محصولات
        </Button>
        <Box onClick={() => setSelectedLayout({ grid: true, list: false })} sx={{ marginRight: "auto" }}>
          <GridView
            sx={{
              color: selectedLayout["grid"] ? "#f03637" : "inherit",
              "&:hover": { color: "#f03637" },
              cursor: "pointer",
              transition: "all 100ms ease-in",
            }}
          />
        </Box>
        <Box onClick={() => setSelectedLayout({ grid: false, list: true })}>
          <TableRows
            sx={{
              color: selectedLayout["list"] ? "#f03637" : "inherit",

              marginLeft: "10px",
              "&:hover": { color: "#f03637" },
              cursor: "pointer",
              transition: "all 100ms ease-in",
            }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          <Typography>تعداد محصولات در صفحه : </Typography>
          <ToolbarButton
            className={productsPerPage==12 ? "active" : ""}
            onClick={() => setProductsPerPage(12)}
          >
            ۱۲
          </ToolbarButton>
          /
          <ToolbarButton
            className={productsPerPage==24 ? "active" : ""}
            onClick={() => setProductsPerPage(24)}
          >
            ۲۴{" "}
          </ToolbarButton>
          /
          <ToolbarButton className={productsPerPage==200 ? "active" : ""} onClick={() => setProductsPerPage(200)}>
            همه
          </ToolbarButton>
        </Box>
      </Box>
      <FormControl sx={{ width: { xs: "100%", sm: "200px" } }} size="small">
        <Select variant="outlined" displayEmpty value={selectedSorting} onChange={selectedSortingHandler}>
          <MenuItem value="">ترتیب پیشفرض</MenuItem>
          <MenuItem value={"rating"}>ترتیب بر اساس امتیاز</MenuItem>
          <MenuItem value={"latest"}>آخرین محصولات</MenuItem>
          <MenuItem value={"price-low-to-high"}>محصولات ارزان به گران </MenuItem>
          <MenuItem value={"price-high-to-low"}>محصولات گران به ارزان</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Toolbar;
