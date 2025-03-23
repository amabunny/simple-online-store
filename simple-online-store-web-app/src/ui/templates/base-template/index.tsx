import { Container } from "@mui/material";
import { ReactNode } from "react";

import { Header } from "../../organisms/header";
import { Provider } from "../../organisms/provider";
import styles from "./style.module.scss";

interface IProps {
  children?: ReactNode;
}

export const BaseTemplate = ({ children }: IProps) => {
  return (
    <Provider>
      <div>
        <Header />
        <Container className={styles.container} maxWidth="xl">
          {children}
        </Container>
      </div>
    </Provider>
  );
};
