import { AddonCategorySlice } from "@/types/addonCategory";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AddonCategorySlice = {
    item: [],
    isLoading: false,
    error: null
}

const addonCategorySlice = createSlice({
    name: "addonCategory",
    initialState,
    reducers: {
        setAddonCategory: (state,action) => {
            state.item = action.payload
        }
    }
})

export const {setAddonCategory} = addonCategorySlice.actions
export default addonCategorySlice.reducer