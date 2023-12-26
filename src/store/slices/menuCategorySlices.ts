import { MenuCategoryState } from "@/types/menuCategory";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategoryState = {
  item: [],
  isLoading: false,
  error: null,
};

export const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategories: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setMenuCategories } = menuCategorySlice.actions;

export default menuCategorySlice.reducer;
