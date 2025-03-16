import { Container } from "@mui/material";

import { Header } from "../../organisms/header";
import styles from "./style.module.scss";

interface IProps {
  children?: React.ReactNode;
}

export const BaseTemplate = ({ children }: IProps) => {
  return (
    <div>
      <Header />
      <Container className={styles.container} maxWidth="xl">
        {children}
      </Container>
    </div>
  );
};
