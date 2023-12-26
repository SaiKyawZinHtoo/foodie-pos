export interface CreateMenuPayload {
  name: string;
  price: number;
  assetUrl?: string;
}

//server ကနေပြန်လာတဲ့ Menu
export interface Menu extends CreateMenuPayload {
  id: number;
  isArchived: boolean;
}

export interface MenuState {
  item: Menu[];
  isLoading: boolean;
  error: Error | null;
}
