"use client";

import { Grid2, TextField, Typography } from "@mui/material";

interface Props {
  className?: string;
}

export const ProductFilters = ({ className }: Props) => {
  return (
    <Grid2 container spacing={4} className={className}>
      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h6" gutterBottom>
          Цена
        </Typography>
        <Grid2 container spacing={2} flexDirection={"row"}>
          <Grid2 size={{ xs: 6 }}>
            <TextField type="number" placeholder="от" size="small" />
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <TextField type="number" placeholder="до" size="small" />
          </Grid2>
        </Grid2>
      </Grid2>

      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h6" gutterBottom>
          Бренд
        </Typography>
        <div>
          <TextField placeholder="Apple" size="small" fullWidth />
        </div>
      </Grid2>

      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h6" gutterBottom>
          Название
        </Typography>
        <div>
          <TextField placeholder="iPhone 11" size="small" fullWidth />
        </div>
      </Grid2>
    </Grid2>
  );
};
