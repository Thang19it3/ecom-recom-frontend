import {
    createSlice,
    createAsyncThunk,
    createAction
} from "@reduxjs/toolkit";
import orderService from "../oders/orderService";

export const updateAOrder = createAsyncThunk(
  "orders/update-oredr",
  async (order, thunkAPI) => {
    try {
      return await orderService.updateOrder(order);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(updateAOrder.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateAOrder.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.updatedStatus = action.payload
        })
        .addCase(updateAOrder.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
      .addCase(resetState, () => initialState);
  },
});

export default orderSlice.reducer;