import { MenuAddonCategorySlice } from "@/types/menuAddonCategory";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: MenuAddonCategorySlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const menuAddonCategorySlice = createSlice({
  name: "menuAddonCategorySlicek",
  initialState,
  reducers: {
    setMenuAddonCategories: (state, action) => {
      state.item = action.payload;
    },
    addMenuAddonCategories: (state, action) => {
      state.item = [...state.item, action.payload];
    },
    replaceMenuAddonCategory: (state, action) => {
      const addonCategoryId = action.payload[0].addonCategoryId; // အဲ့တစ်ကြောင်းကိုသိပ်မရှင်းဘူး
      const otherMenuAddonCategory = state.item.filter(
        (item) => item.addonCategoryId !== addonCategoryId
      );
      state.item = [...otherMenuAddonCategory, action.payload];
    },
    removeMenuAddonCategoryByMenuId: (
      state,
      action: PayloadAction<{ menuId: number }>
    ) => {
      state.item = state.item.filter(
        (item) => item.menuId !== action.payload.menuId
      );
    },
    removeMenuAddonCategoryById: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.item = state.item.filter(
        (item) => item.menuId !== action.payload.id
      );
    },
  },
});

export const {
  setMenuAddonCategories,
  addMenuAddonCategories,
  replaceMenuAddonCategory,
  removeMenuAddonCategoryByMenuId,
  removeMenuAddonCategoryById,
} = menuAddonCategorySlice.actions;
export default menuAddonCategorySlice.reducer;
