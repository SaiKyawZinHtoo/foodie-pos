import { MenuCategoryMenuSlice } from "@/types/menuCategoryMenu";
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState: MenuCategoryMenuSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const menuCategoryMenuSlice = createSlice({
  name: "menuCategoryMenuSlice",
  initialState,
  reducers: {
    setMenuCategoryMenu: (state, action) => {
      state.item = action.payload;
    },
    addMenuCategoryMenu: (state, action) => {
      state.item = [...state.item, ...action.payload];
    },
    replaceMenuCategoryMenu: (state, action) => {
      const menuId = action.payload[0].menuId; // အဲ့တစ်ကြောင်းကိုသိပ်မရှင်းဘူး
      const otherMenuCategoryMenu = state.item.filter(
        (item) => item.id !== menuId
      );
      state.item = [...otherMenuCategoryMenu, action.payload];
    },
  },
});

export const {
  setMenuCategoryMenu,
  addMenuCategoryMenu,
  replaceMenuCategoryMenu,
} = menuCategoryMenuSlice.actions;
export default menuCategoryMenuSlice.reducer;
