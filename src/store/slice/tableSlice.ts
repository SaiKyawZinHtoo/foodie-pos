import {
  CreateTableOptions,
  DeleteTabelOptions,
  TableSlice,
  UpdateTableOptions,
} from "@/types/table";
import { config } from "@/utils/config";
import { Table } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: TableSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const createTable = createAsyncThunk(
  "table/createTable",
  async (options: CreateTableOptions, thunkApi) => {
    const { name, locationId, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/tables`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, locationId }),
      });
      const { table } = await response.json();
      thunkApi.dispatch(addTable(table));
      onSuccess && onSuccess;
    } catch (err) {
      onError && onError();
    }
  }
);

export const updateTable = createAsyncThunk(
  "table/updateTable",
  async (options: UpdateTableOptions, thunkApi) => {
    const { id, name, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/tables`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name }),
      });
      const { table } = await response.json();
      thunkApi.dispatch(replaceTable(table));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const deleteTable = createAsyncThunk(
  "table/deleteTable",
  async (options: DeleteTabelOptions, thunkApi) => {
    const { id, onSuccess, onError } = options;
    try {
      await fetch(`${config.apiBaseUrl}/tables?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(removeTable({ id }));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.item = action.payload;
    },
    replaceTable: (state, action: PayloadAction<Table>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    addTable: (state, action: PayloadAction<Table>) => {
      state.item = [...state.item, action.payload];
    },
    removeTable: (state, action: PayloadAction<{ id: number }>) => {
      state.item = state.item.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setTable, replaceTable, addTable, removeTable } =
  tableSlice.actions;
export default tableSlice.reducer;
