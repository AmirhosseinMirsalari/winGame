import Box from "@mui/material/Box";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { getReadableDate } from "utils/getReadableDate";
import Link from "next/link";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: 10,
}));

type props = {
  id: string;
  writer: string;
  createdAt: string;
  category: string;
};

const CardDescription = ({ id, writer, createdAt, category }: props) => {
  const date = getReadableDate(createdAt);
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      alignItems="flex-end"
    >
      {/* Author article */}
      <Item>
        <Box display="flex" alignItems="center">
          <PersonOutlineOutlinedIcon
            style={{ fontSize: "1rem" }}
            color="secondary"
          />
          <a
            href={`/blog/${id}/writer/${writer.replace(/\s+/g, "-")}`}
            underline="none"
            color="secondary"
            sx={{
              fontSize: "12px",
              "&:hover": {
                color: "#f03637",
                transition: "all 500ms",
              },
            }}
          >
            {writer} -
          </a>
        </Box>
      </Item>
      {/* Release createdAt article */}
      <Item>
        <Box display="flex" fontSize={"12px"}>
          &nbsp;
          <AccessTimeOutlinedIcon
            style={{ fontSize: "13px" }}
            color="secondary"
          />
          &nbsp;{date} -
        </Box>
      </Item>
      {/* category article */}
      <Item>
        <Box display="flex">
          &nbsp;
          <FolderOutlinedIcon style={{ fontSize: "13px" }} color="secondary" />
          <a
            href={`/blog/${id}/category/${category.replace(/\s+/g, "-")}`}
            underline="none"
            color="secondary"
            sx={{
              fontSize: "12px",

              "&:hover": {
                color: "#f03637",
                transition: "all 500ms",
              },
            }}
          >
            &nbsp;{category}
          </a>
        </Box>
      </Item>
    </Box>
  );
};

export default CardDescription;
