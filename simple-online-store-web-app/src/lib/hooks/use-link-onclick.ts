import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Хотел использовать prop component=CustomLink от компонентов MUI, но миссматч по типам, который не исправляется без костылей.
 * Насколько я знаю, для SEO необходимо, чтобы была именно ссылка в href
 */
export const useLinkOnClick = () => {
  const router = useRouter();

  return useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      router.push(e.currentTarget.href);
    },
    [router],
  );
};
