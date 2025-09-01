import { RouterProvider } from "react-router";
import router from "./router";
import { CssBaseline } from "@mui/material";
import Theme from "./components/Theme";
function App() {
  return (
    <Theme>
      <CssBaseline/>
      <RouterProvider router={router} />
    </Theme>
  );
}

export default App;
