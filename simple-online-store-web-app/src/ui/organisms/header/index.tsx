"use client";

import StorefrontIcon from "@mui/icons-material/Storefront";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

import { useLinkOnClick } from "@/lib/hooks";

import { HideOnScroll } from "../../molecules/hide-on-scroll";
import { Menu } from "../menu";

export const Header = () => {
  const handleLinkClick = useLinkOnClick();

  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <IconButton
              component="a"
              href="/"
              onClick={handleLinkClick}
              sx={{ mr: 1 }}
            >
              <StorefrontIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              MUI Online Shop
            </Typography>
            <Menu />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};
