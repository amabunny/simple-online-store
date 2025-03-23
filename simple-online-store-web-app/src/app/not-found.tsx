import { Divider, Grid2, Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Grid2
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: "70vh" }}
    >
      <Stack
        divider={<Divider orientation={"vertical"} flexItem />}
        direction={"row"}
        spacing={4}
        alignItems={"center"}
      >
        <Typography variant={"h1"}> 404 </Typography>
        <Typography variant={"h4"}>Ошибка! Страница не найдена</Typography>
      </Stack>
    </Grid2>
  );
}
