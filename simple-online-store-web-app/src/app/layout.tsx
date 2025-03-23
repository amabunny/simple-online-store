import "./globals.scss";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/system/InitColorSchemeScript";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";

import { BaseTemplate } from "@/ui";

import { StoreProvider } from "./store-provider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "MUI Online Shop",
  description: "Simple MUI Online Shop built with Next.js",
};

interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<IProps>) {
  return (
    /* suppressHydrationWarning нужен, чтобы корректно работал переключатель темы */
    <html lang="ru" suppressHydrationWarning>
      <body className={roboto.variable}>
        <StoreProvider>
          <AppRouterCacheProvider>
            <BaseTemplate>{children}</BaseTemplate>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
