import { Box, Card, Typography } from "@mui/material";
import { useCurrentAartiStore } from "../stores/currentAartiStore";
import { Link } from "react-router";

const CurrentAarti = () => {
  const { current, currentAarti } = useCurrentAartiStore();
  console.log(current, currentAarti);
  return (
    <Card
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
        <Typography variant="h5" gutterBottom>
          {currentAarti?.title}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {currentAarti?.description?.slice(0, 100)}...
        </Typography>
    </Card>
  );
};

export default CurrentAarti;
