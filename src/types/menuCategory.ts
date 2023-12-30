export interface MenuCategory {
  id: number;
  name: string;
  isAvailable: boolean;
  isArchived: boolean;
}

export interface CreateMenuCategoryPayload {
  name: string;
  isAvailable: boolean;
}

export interface UpdateMenuCategory {
  id: number;
  name: string;
}

export interface MenuCategoryState {
  item: MenuCategory[];
  isLoading: boolean;
  error: Error | null;
}
