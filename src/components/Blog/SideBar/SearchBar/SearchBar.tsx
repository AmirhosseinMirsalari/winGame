import Search from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { FilterTitleWrapper } from "components/Shop/styles";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchValue: string;
}
const SearchBar = ({ setSearchValue, searchValue }: Props) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        border: "1px solid #e9e9e9",
        px: "20px",
        pt: "20px",
        pb: "30px",
        mb: "30px",
      }}
      className="search-bar"
    >
      <FilterTitleWrapper className="underline">
        <Typography
          component={"h4"}
          variant="body1"
          color="primary"
          fontWeight={600}
        >
          جستجوی مقاله
        </Typography>
      </FilterTitleWrapper>
      <Box sx={{ position: "relative" }}>
        <InputBase
          sx={{
            backgroundColor: "#e9e9e9",
            borderRadius: "4px",
            py: "6px",
            px: "12px",
            fontSize: "14px",
            width: "100%",
            mt: "14px",
          }}
          placeholder="جستجو"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={() => router.push({ query: { search: searchValue } })}
        />
        <Search
          sx={{
            position: "absolute",
            left: "8px",
            top: "40%",
            cursor: "pointer",
          }}
          onClick={() => router.push({ query: { search: searchValue } })}
        />
      </Box>
    </Box>
  );
};

export default SearchBar;
