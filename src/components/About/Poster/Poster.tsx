import { Box, Typography } from "@mui/material";
import { posterStyle, subjectWrapper, subjectTitle } from "../styles";

const Poster = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        component="img"
        sx={posterStyle}
        src="https://img.freepik.com/free-photo/team-diverse-coworkers-modern-office-discuss-their-project-together_93675-133719.jpg?w=996&t=st=1689562620~exp=1689563220~hmac=84c5ec181079b961fb9eecfc6caeba4d3c3a01fce563adebd9577f37f5d07a3e"
      />
      <Box sx={subjectWrapper}>
        <Box
          sx={{
            width: { md: "100%", lg: "80%" },
            backgroundColor: "#fff",
            padding: "30px 0",
          }}
        >
          <Typography variant="h2" component="h2" sx={subjectTitle}>
            درباره ما، فعالیت ها و محصولات ما بیشتر بدانید
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Poster;
