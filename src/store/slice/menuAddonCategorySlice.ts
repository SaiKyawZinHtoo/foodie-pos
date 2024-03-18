import { MenuAddonCategorySlice } from "@/types/menuAddonCategory";
import { MenuCategoryMenuSlice } from "@/types/menuCategoryMenu";
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

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
  },
});

export const {
  setMenuAddonCategories,
  addMenuAddonCategories,
  replaceMenuAddonCategory,
} = menuAddonCategorySlice.actions;
export default menuAddonCategorySlice.reducer;
