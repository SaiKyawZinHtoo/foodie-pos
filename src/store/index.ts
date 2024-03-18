import { configureStore } from "@reduxjs/toolkit";
import addonCategoriesReducer from "./slice/addonCategorySlice";
import addonReducer from "./slice/addonSlice";
import appReducer from "./slice/appSlice";
import locationReducer from "./slice/locationSlice";
import menuAddonCategoryReducer from "./slice/menuAddonCategorySlice";
import menuCategoryMenuReducer from "./slice/menuCategoryMenuSlice";
import menuCategoriesReducer from "./slice/menuCategorySlice";
import menuReducer from "./slice/menuSlice";
import snackbarReducer from "./slice/snackbarSlice";
import tableReducer from "./slice/tableSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    location: locationReducer,
    table: tableReducer,
    menu: menuReducer,
    menuCategoryMenu: menuCategoryMenuReducer,
    menuCategory: menuCategoriesReducer,
    addonCategory: addonCategoriesReducer,
    menuAddonCategory: menuAddonCategoryReducer,
    addon: addonReducer,
    snackbar: snackbarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
