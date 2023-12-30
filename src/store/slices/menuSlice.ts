import config from "@/config";
import { CreateMenuPayload, MenuState, UpdateMenuPayload } from "@/types/menu";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: MenuState = {
  item: [],
  isLoading: false,
  error: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (payload: CreateMenuPayload, thunkApi) => {
    const response = await fetch(`${config.apiBaseUrl}/menu`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const menus = await response.json();
    thunkApi.dispatch(setMenus(menus));
  }
);

export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async (payload: UpdateMenuPayload, thunkApi) => {
    console.log(payload);
    
    // const response = await fetch(`${config.apiBaseUrl}/menu`, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // });
    // const menus = await response.json();
    // thunkApi.dispatch(setMenus(menus));
  }
);

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, actions) => {
      state.item = actions.payload;
    },
  },
});

export const { setMenus } = menuSlice.actions;

export default menuSlice.reducer;
