import { AddonSlice } from "@/types/addon";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AddonSlice = {
  item: [],
  isLoading: false,
  error: null,
};

const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddon: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setAddon } = addonSlice.actions;
export default addonSlice.reducer;
