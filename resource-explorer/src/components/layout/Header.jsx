import { Link, useLocation } from "react-router-dom";
import SearchInput from "../search/SearchInput";
import FilterSelect from "../filters/FilterSelect";
import SortSelect from "../filters/SortSelect";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  CatchingPokemon,
} from "@mui/icons-material";
import {
  StyledAppBar,
  StyledContainer,
  StyledToolbar,
  StyledLogoBox,
  StyledTypography,
  StyledNavBox,
  StyledNavButton,
  StyledSearchFilterBox,
  StyledThemeIconButton,
  StyledMobileMenuIconButton,
  StyledDrawer,
  StyledDrawerBox,
  StyledDrawerTypography,
  StyledDrawerDivider,
  StyledDrawerListItemButton,
  StyledDrawerIconBox,
} from "./HeaderStyles";

export default function Header() {
  const { theme: themeMode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "Favorites", path: "/favorites", icon: <FavoriteIcon /> },
  ];

  const isActivePath = (path) => location.pathname === path;

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const NavButton = ({ item }) => (
    <StyledNavButton
      component={Link}
      to={item.path}
      startIcon={item.icon}
      isActive={isActivePath(item.path)}
    >
      {item.label}
    </StyledNavButton>
  );

  const MobileDrawer = () => (
    <StyledDrawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
    >
      <StyledDrawerBox>
        <Box>
          <StyledDrawerTypography variant="h6">
            Menu
          </StyledDrawerTypography>
          <IconButton onClick={handleMobileMenuToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <StyledDrawerDivider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <StyledDrawerListItemButton
                component={Link}
                to={item.path}
                onClick={handleMobileMenuToggle}
                selected={isActivePath(item.path)}
              >
                <StyledDrawerIconBox>{item.icon}</StyledDrawerIconBox>
                <ListItemText primary={item.label} />
              </StyledDrawerListItemButton>
            </ListItem>
          ))}
        </List>
        <StyledDrawerDivider />
        <Box>
          <SearchInput />
          <Box>
            <FilterSelect />
          </Box>
          <Box>
            <SortSelect />
          </Box>
          <Box>
            <StyledThemeIconButton onClick={toggleTheme}>
              {themeMode === "light" ? <Brightness4 /> : <Brightness7 />}
            </StyledThemeIconButton>
          </Box>
        </Box>
      </StyledDrawerBox>
    </StyledDrawer>
  );

  return (
    <>
      <StyledAppBar position="static" elevation={0}>
        <StyledContainer maxWidth="xl">
          <StyledToolbar>
            <StyledLogoBox>
              <CatchingPokemon />
              <StyledTypography
                variant="h5"
                component={Link}
                to="/"
              >
                Resource Explorer
              </StyledTypography>
            </StyledLogoBox>

            {!isMobile && (
              <>
                <StyledNavBox>
                  {navItems.map((item) => (
                    <NavButton key={item.path} item={item} />
                  ))}
                </StyledNavBox>

                <StyledSearchFilterBox>
                  <SearchInput />
                  <FilterSelect />
                  <SortSelect />
                </StyledSearchFilterBox>

                <StyledThemeIconButton onClick={toggleTheme}>
                  {themeMode === "light" ? <Brightness4 /> : <Brightness7 />}
                </StyledThemeIconButton>
              </>
            )}
            {isMobile && (
              <StyledMobileMenuIconButton
                color="inherit"
                edge="end"
                onClick={handleMobileMenuToggle}
              >
                <MenuIcon />
              </StyledMobileMenuIconButton>
            )}
          </StyledToolbar>
        </StyledContainer>
      </StyledAppBar>
      {isMobile && <MobileDrawer />}
    </>
  );
}