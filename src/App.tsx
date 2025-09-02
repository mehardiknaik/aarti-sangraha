import { RouterProvider } from "react-router";
import router from "./router";
import { CssBaseline } from "@mui/material";
import Theme from "./components/Theme";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    const splash = document.getElementById("splash");
    if (splash) {
      splash.classList.add("fade-out");
      splash.addEventListener("animationend", () => {
        splash.style.display = "none";
      });
    }
  }, []);
  return (
    <Theme>
      <CssBaseline />
      <RouterProvider router={router} />
    </Theme>
  );
}

export default App;
