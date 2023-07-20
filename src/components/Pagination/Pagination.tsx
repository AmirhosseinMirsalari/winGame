import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box } from "@mui/material";
import { PaginationList, PaginationListItem } from "./styles";
import { useRouter } from "next/router";

type PaginationProps = {
  productsPerPage: number;
  totalProducts: number;
  currentPage: number;
  setCurrentPage: any;
};

function Pagination({ productsPerPage, totalProducts, currentPage, setCurrentPage }: PaginationProps) {
  const pageNumber: number[] = [];
  const { asPath } = useRouter();
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumber.push(i);
  }
  const clickHandler = (page: number) => () => {
    setCurrentPage(page);
    const topDist = asPath === "/shop" || asPath === "/blog" ? 200 : 0;
    window.scroll({
      top: topDist,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Box marginTop={4}>
      <PaginationList>
        <PaginationListItem
          onClick={clickHandler(currentPage - 1)}
          sx={{
            display: currentPage === 1 || totalProducts === 0 ? "none" : "flex",
          }}
        >
          <ChevronLeft />
        </PaginationListItem>

        {pageNumber.length > 1 &&
          pageNumber.map((number, index) => (
            <PaginationListItem
              key={index}
              onClick={clickHandler(number)}
              className={`${number === currentPage && "active"}`}
            >
              {number}
            </PaginationListItem>
          ))}

        <PaginationListItem
          onClick={clickHandler(currentPage + 1)}
          sx={{
            display: currentPage === pageNumber.length || totalProducts === 0 ? "none" : "flex",
          }}
        >
          <ChevronRight />
        </PaginationListItem>
      </PaginationList>
    </Box>
  );
}

export default Pagination;
