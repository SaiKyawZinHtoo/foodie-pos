import { Location } from "@prisma/client";
import { BaseOptions } from "./app";

export interface LocationSlice {
  item: Location[];
  isLoading: boolean;
  error: Error | null;
}

export interface CreateNewLocationOptions extends BaseOptions {
  name: string
  address: string
}
