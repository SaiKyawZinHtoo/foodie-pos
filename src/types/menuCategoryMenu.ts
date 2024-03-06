import { MenuCategoryMenu } from "@prisma/client";

export interface MenuCategoryMenuSlice {
  item: MenuCategoryMenu[];
  isLoading: boolean;
  error: Error | null;
}
