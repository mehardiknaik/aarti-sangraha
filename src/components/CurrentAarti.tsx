import { Box, Typography } from "@mui/material";
import { useCurrentAartiStore } from "../stores/currentAartiStore";
import { Link } from "react-router";

const CurrentAarti = () => {
  const { current, currentAarti } = useCurrentAartiStore();
  console.log(current, currentAarti);
  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        bgcolor: "background.paper",
        p: 2,
        display: "block",
      }}
      component={Link}
      to={`/aarti/${currentAarti?.id}`}
    >
      <Typography variant="h6">Current Aarti</Typography>
      <Typography variant="body1">{currentAarti?.title}</Typography>
    </Box>
  );
};

export default CurrentAarti;
