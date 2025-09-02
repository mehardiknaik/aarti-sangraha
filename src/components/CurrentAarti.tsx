import { Card, Typography } from "@mui/material";
import { useCurrentAartiStore } from "../stores/currentAartiStore";
import { Link, useParams } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import dayjs from "dayjs";

const CurrentAarti = () => {
  const { current, currentAarti } = useCurrentAartiStore();
  const { role } = useAuthStore();
  const { id } = useParams<{ id: string }>();
  if (!current?.currentAartiId || id === current?.currentAartiId) return null;
  return (
    <Card
      sx={{
        position: "sticky",
        bottom: 0,
        p: 2,
        display: "block",
        borderTopColor: "secondary.main",
        borderTopStyle: "solid",
        borderTopWidth: 2,
      }}
      component={Link}
      to={`/aarti/${currentAarti?.id}`}
      raised
    >
      <Typography variant="h5" gutterBottom>
        {currentAarti?.title}
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        {currentAarti?.description?.slice(0, 100)}...
      </Typography>
      {role === "admin" && (
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textAlign: "end" }}
        >
          {current?.userName} {dayjs(current?.updatedAt).format('DD MMM YY, h:mm A')}
        </Typography>
      )}
    </Card>
  );
};

export default CurrentAarti;
