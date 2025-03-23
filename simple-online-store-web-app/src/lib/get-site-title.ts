import { SITE_NAME } from "@/constants/site";

export const getSiteTitle = (title: string) =>
  title ? `${title} – ${SITE_NAME}` : SITE_NAME;
