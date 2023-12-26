import { MenuState } from "@/types/menu";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MenuState = {
  item: [],
  isLoading: false,
  error: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state,actions) => {
      state.item = actions.payload
    }
  },
});

export const {setMenus} = menuSlice.actions

export default menuSlice.reducer;
