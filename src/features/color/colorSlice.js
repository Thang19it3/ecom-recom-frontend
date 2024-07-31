import {
    createSlice,
    createAsyncThunk,
    createAction
} from "@reduxjs/toolkit";
import colorService from "../color/colorService";


export const getColors = createAsyncThunk(
  "category/get-category",
  async (thunkAPI) => {
    try {
      return await colorService.getColor();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");


const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default colorSlice.reducer;