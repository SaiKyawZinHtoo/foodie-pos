import { SnackbarSlice } from "@/types/snackbar";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: SnackbarSlice = {
  message: null,
  autoHideDuration: 3000,
  open: false,
  severity: "success",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setOpenSnackbar: (state, action) => {
      const {
        autoHideDuration = 3000,
        message,
        severity = "success",
      } = action.payload;
      (state.open = true), (state.autoHideDuration = autoHideDuration);
      state.message = message;
      state.severity = severity;
    },
    resetSnackbar: (state) => {
      (state.open = false),
        (state.autoHideDuration = 3000),
        (state.severity = "success"),
        (state.message = null);
    },
  },
});

export const { setOpenSnackbar, resetSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
