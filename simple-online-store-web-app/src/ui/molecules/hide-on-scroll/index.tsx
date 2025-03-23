import { Slide, useScrollTrigger } from "@mui/material";
import { ReactElement } from "react";

interface IProps {
  children: ReactElement<unknown>;
}

export const HideOnScroll = ({ children }: IProps) => {
  const trigger = useScrollTrigger({
    target: typeof window === "object" ? window : undefined,
  });

  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
};
