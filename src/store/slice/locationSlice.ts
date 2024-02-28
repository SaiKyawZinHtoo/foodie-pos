import { CreateNewLocationOptions, LocationSlice } from "@/types/location";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState: LocationSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const createNewLocation = createAsyncThunk(
  "location/createNewLocation",
  async (Option: CreateNewLocationOptions, thunkApi) => {
    const { name, address, onError, onSuccess } = Option;
    try {
      const response = await fetch(`${config.apiBaseUrl}/location`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, address }),
      });
      const createdLocation = await response.json();
      thunkApi.dispatch(addLocation(createdLocation));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.item = action.payload;
    },
    addLocation: (state, action) => {
      state.item = [...state.item, action.payload];
    },
  },
});

export const { setLocation, addLocation } = locationSlice.actions;
export default locationSlice.reducer;
