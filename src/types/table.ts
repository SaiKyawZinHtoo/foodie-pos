import { Table } from "@prisma/client";

export interface TableSlice {
  item: Table[];
  isLoading: boolean;
  error: Error | null;
}

