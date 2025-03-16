import { Add, ShoppingCart } from "@mui/icons-material";
import {
  Badge,
  Grid2,
  IconButton,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useAppSelector, useLinkOnClick } from "@/lib/hooks";
import { totalItemsCountSelector } from "@/shared/cart";

import { CustomLink } from "../../molecules/link";

export const Menu = () => {
  const totalItemsCount = useAppSelector(totalItemsCountSelector);
  const currentPath = usePathname();

  const [createLinkAnchor, setCreateLinkAnchor] =
    useState<HTMLAnchorElement | null>(null);

  const handleLinkClick = useLinkOnClick();

  return (
    <Grid2 container spacing={4}>
      <div>
        <Badge badgeContent={totalItemsCount} color="secondary">
          <IconButton size="small">
            <ShoppingCart color="action" />
          </IconButton>
        </Badge>

        <IconButton
          component="a"
          onMouseEnter={(e) => {
            setCreateLinkAnchor(e.currentTarget);
          }}
          onMouseLeave={() => setCreateLinkAnchor(null)}
          href="/products/create"
          onClick={handleLinkClick}
          size="small"
        >
          <Add />
        </IconButton>

        <Popover
          id="cart-popover"
          open={!!createLinkAnchor}
          onClose={() => setCreateLinkAnchor(null)}
          anchorEl={createLinkAnchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          disableRestoreFocus
          sx={{ pointerEvents: "none" }}
        >
          <Typography sx={{ padding: 1 }}>Создать товар </Typography>
        </Popover>
      </div>

      <ToggleButtonGroup value={currentPath} exclusive size="small">
        <ToggleButton value={"/"}>
          <CustomLink href="/" underline={false}>
            Клиентский фильтр
          </CustomLink>
        </ToggleButton>

        <ToggleButton value={"/products"}>
          <CustomLink href="/products" underline={false}>
            Серверный фильтр
          </CustomLink>
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid2>
  );
};
