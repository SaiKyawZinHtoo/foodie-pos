import { Table } from "@prisma/client";
import { BaseOptions } from "./app";

export interface TableSlice {
  item: Table[];
  isLoading: boolean;
  error: Error | null;
}

export interface UpdateTableOptions extends BaseOptions {
  id: number;
  name: string;
  locationId: number
}

export interface DeleteTabelOptions extends BaseOptions {
  id: number;
}

export interface CreateTableOptions extends BaseOptions {
  name: string;
  locationId?: number;
}
