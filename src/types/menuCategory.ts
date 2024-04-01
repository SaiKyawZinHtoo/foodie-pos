import { MenuCategory } from "@prisma/client";
import { BaseOptions } from "./app";

export interface MenuCategorySlice {
  item: MenuCategory[];
  isLoading: boolean;
  error: Error | null;
}

export interface CreateMenuCategoryOptions extends BaseOptions {
  name: string;
  locationId: number;
}

export interface UpdateMenuCategoryOptions extends BaseOptions {
  id: number;
  name: string;
}

export interface deleteMenuCategoryOptions extends BaseOptions {
  id: number;
}
