import {
    createSlice,
    createAsyncThunk,
    createAction
} from "@reduxjs/toolkit";
import categoryService from "../category/categoryService";


export const getCategorys = createAsyncThunk(
  "category/get-category",
  async (thunkAPI) => {
    try {
      return await categoryService.getCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");


const initialState = {
  categorys: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const categorySlice = createSlice({
  name: "categorys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategorys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategorys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categorys = action.payload;
      })
      .addCase(getCategorys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default categorySlice.reducer;