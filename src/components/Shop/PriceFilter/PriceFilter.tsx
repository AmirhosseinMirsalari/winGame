import { useState,useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FilterTitleWrapper, PriceSlider } from "../styles";
import { useRouter } from "next/router";

interface Props {
  drawer: boolean;
}
function PriceFilter({ drawer }: Props) {
  const router = useRouter()
  const [value, setValue] = useState<number[]>([100000, 10000000])
  
  useEffect(() => {
    const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]) || ""
    const priceRangeQueryParam = searchParams?.get('price')
    if (priceRangeQueryParam) {
      const [min, max] = priceRangeQueryParam.split('/').map((value) => Number(value.split('=')[1]))
      setValue([min, max])
    }
    if (router.asPath=="/shop") {
      setValue([100000, 10000000])
    }
  }, [router.asPath])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const addPriceQueryParams = () => {
    router.push(`/shop?price=min=${value[0]}/max=${value[1]}`, undefined, { shallow: false })
  }
  return (
    <Box
      sx={{
        padding: "20px",
        border: drawer ? "1px solid #e9e9e9" : "",
        marginTop: drawer ? "40px" : "25px !important",
        borderRadius:"30px",
        boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.1)",
        margin: !drawer ? "0px 10px" : ""


      }}
    >
      <FilterTitleWrapper className={`${drawer && "underline"}`}>
        <Typography component={"h4"} variant="body1" color="primary" fontWeight={600}>
          بر اساس قیمت
        </Typography>
      </FilterTitleWrapper>
      <Box marginTop={2} marginBottom={1}>
        <PriceSlider
          getAriaLabel={() => "price range"}
          value={value}
          min={100000}
          step={100000}
          max={10000000}
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" color="primary">{`بازه قیمت : ${value[0]} — ${value[1]}`}</Typography>
        <Button variant="contained" sx={{ paddingY: "4px",borderRadius:"10px" }} onClick={addPriceQueryParams}>
          فیلتر
        </Button>
      </Box>
    </Box>
  );
}

export default PriceFilter;
