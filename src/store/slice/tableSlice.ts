import { TableSlice } from "@/types/table";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TableSlice = {
  item: [], 
  isLoading: false,
  error: null,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setTable } = tableSlice.actions;
export default tableSlice.reducer;
