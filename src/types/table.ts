import { Table } from "@prisma/client";

export interface TableSlice {
  item: Table[];
  isLoading: boolean;
  error: Error | null;
}

export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
