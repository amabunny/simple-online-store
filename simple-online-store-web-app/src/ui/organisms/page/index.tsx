import { Breadcrumbs, Grid2, Typography } from "@mui/material";
import { ReactNode } from "react";

import { CustomLink } from "@/ui/molecules/link";

interface IProps {
  children: ReactNode;
  breadcrumbs?: {
    label: string;
    href: string;
  }[];
  pageTitle?: string;
}

export const Page = ({ breadcrumbs, children, pageTitle }: IProps) => {
  return (
    <>
      <Grid2 container spacing={3} flexDirection={"column"}>
        {pageTitle && (
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <Typography variant="h5" align="center">
              {pageTitle}
            </Typography>
          </Grid2>
        )}

        {breadcrumbs && (
          <Grid2 size={{ xs: 12 }}>
            <Breadcrumbs>
              {breadcrumbs.map((breadcrumb, index) =>
                index === breadcrumbs.length - 1 ? (
                  <Typography key={breadcrumb.label}>
                    {breadcrumb.label}
                  </Typography>
                ) : (
                  <CustomLink key={breadcrumb.label} href={breadcrumb.href}>
                    {breadcrumb.label}
                  </CustomLink>
                ),
              )}
            </Breadcrumbs>
          </Grid2>
        )}
        <Grid2 size={{ xs: 12 }}>{children}</Grid2>
      </Grid2>
    </>
  );
};
