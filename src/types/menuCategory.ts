import { MenuCategory } from "@prisma/client";

export interface MenuCategorySlice {
  item: MenuCategory[];
  isLoading: boolean;
  error: Error | null;
}

export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateMenuCategoryOptions extends BaseOptions {
  name: string;
  locationId: number;
}
