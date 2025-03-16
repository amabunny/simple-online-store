import { Alert, Snackbar } from "@mui/material";

interface IProps {
  open: boolean;
  onClose: () => void;
  severity: "error" | "success" | null;
  message: string;
}

export const CustomSnackbar = ({
  open,
  onClose,
  severity,
  message,
}: IProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={severity ?? undefined}>{message}</Alert>
    </Snackbar>
  );
};
