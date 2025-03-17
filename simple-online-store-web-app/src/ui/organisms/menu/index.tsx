import { Add, ShoppingCart } from "@mui/icons-material";
import { Badge, Grid2, IconButton, Popover, Typography } from "@mui/material";
import { useState } from "react";

import { useAppSelector, useLinkOnClick } from "@/lib/hooks";
import { totalItemsCountSelector } from "@/shared/cart";

import { CartPopover } from "../cart-popover";

export const Menu = () => {
  const totalItemsCount = useAppSelector(totalItemsCountSelector);

  const [cartPopoverAnchor, setCartPopoverAnchor] =
    useState<HTMLAnchorElement | null>(null);

  const [createLinkAnchor, setCreateLinkAnchor] =
    useState<HTMLAnchorElement | null>(null);

  const handleLinkClick = useLinkOnClick();

  return (
    <Grid2 container spacing={4}>
      <div>
        <Badge badgeContent={totalItemsCount} color="secondary">
          <IconButton
            size="small"
            component="a"
            href="/cart"
            onClick={handleLinkClick}
            onMouseEnter={(e) => {
              setCartPopoverAnchor(e.currentTarget);
            }}
            onMouseLeave={() => setCartPopoverAnchor(null)}
          >
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
          open={!!cartPopoverAnchor}
          onClose={() => setCartPopoverAnchor(null)}
          anchorEl={cartPopoverAnchor}
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
          <CartPopover />
        </Popover>

        <Popover
          id="create-product-popover"
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
    </Grid2>
  );
};
