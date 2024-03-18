import {
  CreateMenuOptions,
  DeleteMenuOptions,
  GetMenuOptions,
  MenuSlice,
  UpdateMenuOptions,
} from "@/types/menu";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addMenuCategoryMenu,
  replaceMenuCategoryMenu,
} from "./menuCategoryMenuSlice";
import { actionAsyncStorage } from "next/dist/client/components/action-async-storage.external";

const initialState: MenuSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const getMenu = createAsyncThunk(
  "menu/getMenu",
  async (options: GetMenuOptions, ThunkApi) => {
    const { locationId, onSuccess, onError } = options;
    try {
      const response = await fetch(`/menu?locationId=${locationId}`);
      const menus = await response.json();
      ThunkApi.dispatch(setMenus(menus));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (options: CreateMenuOptions, ThunkApi) => {
    const { name, price, menuCategoryIds, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menus`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, price, menuCategoryIds }),
      });
      const { newMenu, newMenuCategoryMenus } = await response.json();
      ThunkApi.dispatch(addMenu(newMenu));
      ThunkApi.dispatch(addMenuCategoryMenu(newMenuCategoryMenus));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async (options: UpdateMenuOptions, ThunkApi) => {
    const { id, name, price, menuCategoryIds, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menus`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name, price, menuCategoryIds }),
      });
      const { menu, menuCategoryMenu } = await response.json();
      ThunkApi.dispatch(replaceMenu(menu));
      ThunkApi.dispatch(replaceMenuCategoryMenu(menuCategoryMenu));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (options: DeleteMenuOptions, ThunkApi) => {
    const { id, onSuccess, onError } = options;
    try {
      await fetch(`${config.apiBaseUrl}/menus?id=${id}`, {
        method: "DELETE",
      });
      ThunkApi.dispatch(removeMenu({ id }));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, action) => {
      state.items = action.payload;
    },
    replaceMenu: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeMenu: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    addMenu: (state, action) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setMenus, replaceMenu, removeMenu, addMenu } = menuSlice.actions;
export default menuSlice.reducer;
