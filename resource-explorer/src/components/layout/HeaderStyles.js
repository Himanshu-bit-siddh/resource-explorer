import { styled } from "@mui/material/styles";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  Divider,
  ListItemButton,
} from "@mui/material";
import { alpha } from "@mui/material";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  backdropFilter: "blur(10px)",
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
}));

export const StyledContainer = styled(Container)({
  maxWidth: "xl",
});

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: theme.breakpoints.down("sm") ? 64 : 70,
}));

export const StyledLogoBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  "& .MuiSvgIcon-root": {
    fontSize: 32,
    marginRight: 8,
    color: theme => theme.palette.common.white,
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
  },
});

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: `linear-gradient(45deg, ${theme.palette.common.white} 30%, ${alpha(theme.palette.common.white, 0.8)} 90%)`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textDecoration: "none",
  letterSpacing: "0.5px",
  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
  "&:hover": {
    transform: "scale(1.02)",
    transition: "transform 0.2s ease-in-out",
  },
}));

export const StyledNavBox = styled(Box)({
  display: "flex",
  gap: 8,
  marginRight: 24,
});

export const StyledNavButton = styled(Button)(({ theme, isActive }) => ({
  color: "inherit",
  fontWeight: isActive ? 600 : 400,
  backgroundColor: isActive
    ? alpha(theme.palette.common.white, 0.1)
    : "transparent",
  borderRadius: 8,
  padding: "8px 16px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    transform: "translateY(-1px)",
  },
}));

export const StyledSearchFilterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 16,
  alignItems: "center",
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  borderRadius: 12,
  padding: 8,
  marginRight: 16,
}));

export const StyledThemeIconButton = styled(IconButton)(({ theme }) => ({
  color: "inherit",
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
    transform: "rotate(180deg)",
  },
}));

export const StyledMobileMenuIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 280,
    background: theme.palette.background.paper,
  },
}));

export const StyledDrawerBox = styled(Box)({
  padding: 16,
  "& > div": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  "& > div > div": {
    marginTop: 16,
    "& > div": {
      marginTop: 16,
    },
  },
});

export const StyledDrawerTypography = styled(Typography)({
  fontWeight: "bold",
});

export const StyledDrawerDivider = styled(Divider)({
  margin: "16px 0",
});

export const StyledDrawerListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 8,
  marginBottom: 8,
  "&.Mui-selected": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

export const StyledDrawerIconBox = styled(Box)(({ theme }) => ({
  marginRight: 16,
  color: theme.palette.primary.main,
}));