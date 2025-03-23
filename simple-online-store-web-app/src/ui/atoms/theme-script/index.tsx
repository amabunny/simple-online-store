"use client";
import { memo } from "react";

/** InitColorSchemeScript вызывает flickering на первом рендере, хотя в документации
 * указано использовать его. Не понял, как решить. Написал свое решение для
 * инициализации темы
 * @see InitColorSchemeScript
 * @link https://mui.com/material-ui/customization/css-theme-variables/configuration/#preventing-ssr-flickering */
export const ThemeScript = memo(() => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function() {
          const lsKey = 'mui-mode';
          const theme = localStorage?.getItem(lsKey);
          const html = document.querySelector('html');
          if (theme) {
            html.classList.add(theme);
          } else {
            const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
            
           if (darkThemeMq.matches) {
             html.classList.add('dark');
             localStorage?.setItem(lsKey, 'dark')
           } else {
             html.classList.add('light');
             localStorage?.setItem(lsKey, 'light')
           }
          }
        })()`,
      }}
    />
  );
});

ThemeScript.displayName = "ThemeScript";
