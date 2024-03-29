import {
  CreateMenuCategoryOptions,
  MenuCategorySlice,
} from "@/types/menuCategory";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategorySlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const createMenuCategory = createAsyncThunk(
  "menuCategory/createMenuCategory",
  async (Option: CreateMenuCategoryOptions, thunkApi) => {
    const { locationId, name, onSuccess, onError } = Option;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menu-categories`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, locationId }),
      });
      const menuCategory = await response.json();
      thunkApi.dispatch(addMenuCategory(menuCategory));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategories: (state, action) => {
      state.item = action.payload;
    },
    addMenuCategory: (state, action) => {
      state.item = [...state.item, action.payload];
    },
  },
});

export const { setMenuCategories, addMenuCategory } = menuCategorySlice.actions;
export default menuCategorySlice.reducer;
