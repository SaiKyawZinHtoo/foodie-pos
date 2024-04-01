import { MenuCategoryMenuSlice } from "@/types/menuCategoryMenu";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    removeMenuCategoryMenu: (
      state,
      action: PayloadAction<{ menuCategoryId: number }>
    ) => {
      state.item = state.item.filter(
        (item) => item.menuCategoryId !== action.payload.menuCategoryId
      );
    },
  },
});

export const {
  setMenuCategoryMenu,
  addMenuCategoryMenu,
  replaceMenuCategoryMenu,
  removeMenuCategoryMenu,
} = menuCategoryMenuSlice.actions;
export default menuCategoryMenuSlice.reducer;
