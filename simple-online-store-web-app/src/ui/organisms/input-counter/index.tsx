import { Add, Remove } from "@mui/icons-material";
import { Grid2, IconButton, Typography } from "@mui/material";
import clsx from "clsx";

import styles from "./style.module.scss";

interface IProps {
  value: number;
  onInc: (value: number) => void;
  onDec: (value: number) => void;
  className?: string;
}

export const InputCounter = ({ onInc, value, onDec, className }: IProps) => {
  return (
    <div className={styles.layer}>
      <Grid2
        container
        alignItems={"center"}
        className={clsx(className, styles.container)}
        spacing={1}
      >
        <IconButton onClick={() => onDec(value - 1)} size={"small"}>
          <Remove />
        </IconButton>
        <Grid2>
          <Typography variant={"body2"}>{value}</Typography>
        </Grid2>
        <IconButton onClick={() => onInc(value + 1)} size={"small"}>
          <Add />
        </IconButton>
      </Grid2>
    </div>
  );
};
