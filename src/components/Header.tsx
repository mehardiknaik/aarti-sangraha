import { Box, useTheme, type SxProps, type Theme } from "@mui/material";
import { renderToStaticMarkup } from "react-dom/server";
import ProfileBg from "./svg/ProfileBg";

interface HeaderProps {
  colour?: string;
  sx?: SxProps<Theme>;
}

const Header = ({ colour, sx }: HeaderProps) => {
  const theme = useTheme();
  const svgString = encodeURIComponent(
    renderToStaticMarkup(
      <ProfileBg color={colour || theme.palette.secondary.main} />
    )
  );

  return (
    <Box
      sx={{
        backgroundImage: `url('data:image/svg+xml;utf8, ${svgString}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100%",
        ...sx,
      }}
    ></Box>
  );
};

export default Header;
