    import {
        createSlice,
        createAsyncThunk
    } from '@reduxjs/toolkit';

    import { toast } from 'react-toastify';
        
    import {
        ghtkService
    } from './GhtkService';





    export const Province = createAsyncThunk("ghtk/province", async (thunkAPI) => {
        try {
            const provinces = await ghtkService.getProvince();
            return provinces;
        } catch (error) {
            if (thunkAPI && thunkAPI.rejectWithValue) {
                return thunkAPI.rejectWithValue(error.message || 'Error occurred');
            }
            throw error;
        }
    });
    export const District = createAsyncThunk("ghtk/district", async (provinceId,thunkAPI) => {
        try {
            const districts = await ghtkService.getDistrict(provinceId);
            return districts;
        } catch (error) {
            if (thunkAPI && thunkAPI.rejectWithValue) {
                return thunkAPI.rejectWithValue(error.message || 'Error occurred');
            }
            throw error;
        }
    });

    export const Ward = createAsyncThunk("ghtk/ward", async (districtId, thunkAPI) => {
        try {
            const wards = await ghtkService.getWard(districtId);
            return wards;
        } catch (error) {
            if (thunkAPI && thunkAPI.rejectWithValue) {
                return thunkAPI.rejectWithValue(error.message || 'Error occurred');
            }
            throw error;
        }
    });

    export const service = createAsyncThunk("ghtk/services", async ({fromDistrict, toDistrict}, thunkAPI) => {
        try {
            const services = await ghtkService.getServices(fromDistrict, toDistrict);
            return services;
        } catch (error) {
            if (thunkAPI && thunkAPI.rejectWithValue) {
                return thunkAPI.rejectWithValue(error.message || 'Error occurred');
            }
            throw error;
        }
    });

    export const shipping = createAsyncThunk("ghtk/shipping", async ({serviceId, insuranceValue, fromDistrict, toDistrict, toWard, height, length, weight, width}, thunkAPI) => {
        try {
            const services = await ghtkService.getShipping(serviceId, insuranceValue, fromDistrict, toDistrict, toWard, height, length, weight, width);
            return services;
        } catch (error) {
            if (thunkAPI && thunkAPI.rejectWithValue) {
                return thunkAPI.rejectWithValue(error.message || 'Error occurred');
            }
            throw error;
        }
    });

    const ghtkState = {
        ghtk: "",
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ""
    }

    export const ghtkSlice = createSlice({
        name: "ghtk",
        initialState: ghtkState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(Province.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(Province.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.provinces = action.payload;
                    
                })
                .addCase(Province.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                })
                .addCase(District.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(District.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.districts = action.payload;
                    
                })
                .addCase(District.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                })
                .addCase(Ward.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(Ward.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.wards = action.payload;
                    
                })
                .addCase(Ward.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                })
                .addCase(service.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(service.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.services = action.payload;
                    
                })
                .addCase(service.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                })
                .addCase(shipping.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(shipping.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.shippings = action.payload;
                    
                })
                .addCase(shipping.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                })

        }
    });

    export default ghtkSlice.reducer;