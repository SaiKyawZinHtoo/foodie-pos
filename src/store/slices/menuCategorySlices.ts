
import config from "@/config";
import {
  CreateMenuCategoryPayload,
  MenuCategoryState,
} from "@/types/menuCategory";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategoryState = {
  item: [],
  isLoading: false,
  error: null,
};

export const createMenuCategory = createAsyncThunk(
  "menuCategory/createMenuCategory",
  async (payload: CreateMenuCategoryPayload, thunkApi) => {
    const response = await fetch(`${config.apiBaseUrl}/menu-category`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const menuCategories = await response.json();
    thunkApi.dispatch(setMenuCategories(menuCategories))
  }
);

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
