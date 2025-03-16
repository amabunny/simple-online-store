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
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useAppSelector } from "@/lib/hooks/store";
import { totalItemsCountSelector } from "@/shared/cart";

import { CustomLink } from "../../molecules/link";

export const Menu = () => {
  const totalItemsCount = useAppSelector(totalItemsCountSelector);
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);
  const currentPath = usePathname();
  const router = useRouter();

  /**
   * Хотел использовать prop component=CustomLink от IconButton, но миссматч по типам, который не исправляется без костылей.
   * Насколько я знаю, для SEO необходимо, чтобы была именно ссылка в href
   */
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(e.currentTarget.href);
  };

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
            setAnchorEl(e.currentTarget);
          }}
          onMouseLeave={() => setAnchorEl(null)}
          href="/products/create"
          onClick={handleLinkClick}
          size="small"
        >
          <Add />
        </IconButton>

        <Popover
          id="cart-popover"
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorEl={anchorEl}
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
            Товары (клиент)
          </CustomLink>
        </ToggleButton>

        <ToggleButton value={"/server"}>
          <CustomLink href="/products" underline={false}>
            Товары (сервер)
          </CustomLink>
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid2>
  );
};
