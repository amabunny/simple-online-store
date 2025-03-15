"use client";

import StorefrontIcon from "@mui/icons-material/Storefront";
import { AppBar, Toolbar, Typography } from "@mui/material";

import { Menu } from "../menu";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <StorefrontIcon sx={{ mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MUI Online Shop
        </Typography>
        <Menu />
      </Toolbar>
    </AppBar>
  );
};
