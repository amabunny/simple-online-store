import clsx from "clsx";
import Link, { LinkProps } from "next/link";

import styles from "./style.module.scss";

interface ICustomLinkProps extends Omit<LinkProps, "as"> {
  underline?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const CustomLink = ({
  href,
  children,
  underline = true,
  ...props
}: ICustomLinkProps) => {
  return (
    <Link
      className={clsx(props.className, styles.link, {
        [styles.underline]: underline,
      })}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
};
