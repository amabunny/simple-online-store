import { Container } from "@mui/material";

import { Header } from "../../organisms/header";

interface Props {
  children?: React.ReactNode;
}

export const BaseTemplate = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {children}
      </Container>
    </div>
  );
};
