import { MenuAddonCategory } from "@prisma/client";

export interface MenuAddonCategorySlice {
  item: MenuAddonCategory[];
  isLoading: boolean;
  error: Error | null;
}
