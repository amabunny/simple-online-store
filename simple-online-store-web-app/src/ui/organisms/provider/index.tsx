"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ConfirmProvider } from "material-ui-confirm";
import React from "react";

import { theme } from "@/lib/theme";

import { ThemeScript } from "../../atoms/theme-script";

interface IProps {
  children: React.ReactNode;
}

export const Provider = ({ children }: IProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <ThemeScript />
      <ConfirmProvider
        defaultOptions={{
          confirmationText: "ОК",
          cancellationText: "Отмена",
          dialogProps: { maxWidth: "xs" },
        }}
      >
        {children}
      </ConfirmProvider>
    </ThemeProvider>
  );
};
