import React, { useEffect } from "react";
import { useAartiStore } from "../../stores/aartiStore";
import {
  Avatar,
  Box,
  CircularProgress,
  Fab,
  IconButton,
  Typography,
} from "@mui/material";
import SingleItems from "../../components/SingleItems";
import Header from "../../components/Header";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthStore } from "../../stores/useAuthStore";
import AddIcon from "@mui/icons-material/Add";

const HomePage = () => {
  const { aartis, loading } = useAartiStore();
  const { login, logout, user, role } = useAuthStore();
  const navigate = useNavigate();

  const handleSettingClick = () => {
    navigate("/setting");
  };

  const handleLoginClick = () => {
    if (!user) login();
    else logout();
  };

  console.log("first", user, role);

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Box
        sx={{
          height: 175,
          position: "relative",
          padding: 2,
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
        />
        <Typography variant="h4">Aarti Sangraha</Typography>
        <Box>
          <IconButton aria-label="settings" onClick={handleSettingClick}>
            <SettingsIcon />
          </IconButton>
          <IconButton aria-label="account" onClick={handleLoginClick}>
            {user ? (
              <Avatar
                alt={user?.displayName}
                src={user?.photoURL}
                sx={{ width: 30, height: 30 }}
              />
            ) : (
              <AccountCircleIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 2,
          padding: 2,
        }}
      >
        {aartis.map((aarti) => (
          <SingleItems key={aarti.id} {...aarti} />
        ))}
      </Box>
      {role === "admin" && (
        <Fab
          size="medium"
          color="secondary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={() => navigate("/aarti/new")}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
};

export default HomePage;
