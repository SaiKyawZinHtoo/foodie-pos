export interface MenuSlice {
  items: [];
  isLoading: boolean;
  error: Error | null;
}

export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface GetMenuOptions extends BaseOptions {
  locationId: string;
}
