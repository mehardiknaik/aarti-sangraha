import { type FC } from "react";
import type { Aarti } from "../stores/aartiStore";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router";

interface SingleItemsProps extends Aarti {}

const SingleItems: FC<SingleItemsProps> = ({
  title,
  description,
  order,
  id,
}) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/aarti/${id}`);
  };
  return (
    <Card variant="outlined">
      <CardContent
        component={Button}
        onClick={handleNavigation}
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          height: "100%",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: "text.secondary" }}>
          {order}.
        </Typography>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {description?.slice(0, 100)}...
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleItems;
