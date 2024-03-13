import { Addon } from "@prisma/client";

export interface AddonSlice {
  item: Addon[];
  isLoading: boolean;
  error: Error | null;
}


