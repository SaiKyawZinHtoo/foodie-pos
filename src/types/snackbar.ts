type SnackarSeverity = "success" | "error";

export interface SnackbarSlice {
  message: string | null;
  autoHideDuration: number;
  open: boolean;
  severity: SnackarSeverity;
}
