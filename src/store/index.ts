import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slice/menuSlice";
import appReducer from "./slice/appSlice";
import locationReducer from "./slice/locationSlice";
import tableReducer from "./slice/tableSlice";
import menuCategoriesReducer from "./slice/menuCategorySlice";
import addonCategoriesReducer from "./slice/addonCategorySlice";
import addonReducer from "./slice/addonSlice";
import menuCategoryMenuReducer from "./slice/menuCategoryMenuSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    location: locationReducer,
    table: tableReducer,
    menu: menuReducer,
    menuCategoryMenu: menuCategoryMenuReducer,
    menuCategory: menuCategoriesReducer,
    addonCategory: addonCategoriesReducer,
    addon: addonReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
