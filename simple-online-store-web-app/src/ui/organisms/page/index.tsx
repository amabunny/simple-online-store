import { Breadcrumbs, Grid2 } from "@mui/material";

import { CustomLink } from "@/ui/molecules/link";

interface IProps {
  children: React.ReactNode;
  breadcrumbs: {
    label: string;
    href: string;
  }[];
}

export const Page = ({ breadcrumbs, children }: IProps) => {
  return (
    <Grid2 container spacing={3} flexDirection={"column"}>
      <Grid2 size={{ xs: 12 }}>
        <Breadcrumbs>
          {breadcrumbs.map((breadcrumb) => (
            <CustomLink key={breadcrumb.label} href={breadcrumb.href}>
              {breadcrumb.label}
            </CustomLink>
          ))}
        </Breadcrumbs>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>{children}</Grid2>
    </Grid2>
  );
};
