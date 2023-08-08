import { Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import { ContentWrapper } from "../styles";
import { useRouter } from "next/router";
import { PButton, PTitle } from "../../../../styles/panel";

interface T {
  title: string;
}

const ContentHeader = ({ title }: T) => {
  const navigate = useRouter();
  return (
    <ContentWrapper>
      <PTitle>{title}</PTitle>
      <Box sx={{ display: "flex", gap: 1 }}>
        <PButton variant="contained" onClick={() => navigate.push(`/panel/${title.toLowerCase()}/add`)}>
          <Add />
          create new
        </PButton>
      </Box>
    </ContentWrapper>
  );
};

export default ContentHeader;
