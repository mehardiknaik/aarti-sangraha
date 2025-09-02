import { useNavigate, useParams } from "react-router";
import { useAartiStore } from "../../stores/aartiStore";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSettingStore } from "../../stores/settingStore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useCurrentAartiStore } from "../../stores/currentAartiStore";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import { useAuthStore } from "../../stores/useAuthStore";
const ViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { current } = useCurrentAartiStore();
  const aarti = useAartiStore((state) => state.getAarti(id || ""));
  const { fontSize } = useSettingStore();
  const { role } = useAuthStore();
  const { updateCurrent } = useCurrentAartiStore();
  const navigate = useNavigate();
  const { palette } = useTheme();

  const handleSettingClick = () => {
    navigate("/setting");
  };
  const handleGoBack = () => {
    navigate("/");
  };
  const handleCurrentAarti = () => {
    if (aarti?.id) updateCurrent(aarti.id);
  };

  return (
    <Box>
      <Box
        sx={{
          height: 175,
          position: "relative",
          padding: 1.5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Header
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
          }}
          colour={current?.currentAartiId===id ? palette.primary.main : palette.secondary.main}
        />
        <Box display={"flex"} alignItems="flex-start" gap={1}>
          <IconButton aria-label="go back" onClick={handleGoBack}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <Typography variant="h4">{aarti?.title}</Typography>
        </Box>
        <Box display={"flex"} alignItems="flex-start" gap={1}>
          <IconButton aria-label="settings" onClick={handleSettingClick}>
            <SettingsIcon />
          </IconButton>
          {role === "admin" && (
            <IconButton aria-label="current aarti" onClick={handleCurrentAarti}>
              <PodcastsIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Typography variant="body1" sx={{ fontSize, p: 3 }}>
        {aarti?.description}
      </Typography>
    </Box>
  );
};

export default ViewPage;
