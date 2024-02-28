import { AppSlice, GetAppDataOptions } from "@/types/app";
import { config } from "@/utils/config";
import { TurnRight } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create } from "domain";
import { setLocation } from "./locationSlice";
import { setTable } from "./tableSlice";
import { setMenuCategories } from "./menuCategorySlice";
import { setMenus } from "./menuSlice";
import { setAddonCategory } from "./addonCategorySlice";
import { setAddon } from "./addonSlice";

const initialState: AppSlice = {
  init: false,
  isLoading: false,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (options: GetAppDataOptions, thunkApi) => {
    const { onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/app`);
      const appData = await response.json();
      const {
        locations,
        table,
        menuCategories,
        menus,
        addonCategories,
        addon,
      } = appData;
      thunkApi.dispatch(setInit(true));
      thunkApi.dispatch(setLocation(locations));
      thunkApi.dispatch(setTable(table));
      thunkApi.dispatch(setMenuCategories(menuCategories));
      thunkApi.dispatch(setMenus(menus));
      thunkApi.dispatch(setAddonCategory(addonCategories));
      thunkApi.dispatch(setAddon(addon));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action) => {
      state.init = action.payload;
    },
  },
});

export const { setInit } = appSlice.actions;
export default appSlice.reducer;
