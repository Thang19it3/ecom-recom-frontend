import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsService } from './productService';
import { toast } from 'react-toastify';



export const getAllProducts = createAsyncThunk("product/get", async (data,thunkAPI) => {
    try {
        return await productsService.getProducts(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAllPro = createAsyncThunk("product/all", async (thunkAPI) => {
    try {
        return await productsService.getAllProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const getAProducts = createAsyncThunk("product/getAProduct", async (id,thunkAPI) => {
    try {
        return await productsService.getSingProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addToWishlist = createAsyncThunk("product/wishlist", async (prodId, thunkAPI) => {
    try {
        return await productsService.addToWishlist(prodId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addRating = createAsyncThunk("product/rating", async (data, thunkAPI) => {
    try {
        return await productsService.rateProduct(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const recomProducts = createAsyncThunk("product/recom", async ( thunkAPI) => {
    try {
        return await productsService.recomProduct();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const exProducts = createAsyncThunk("product/ex", async (thunkAPI) => {
    try {
        return await productsService.exProduct();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const recomAProducts = createAsyncThunk("product/Arecom", async (productname,thunkAPI) => {
    try {
        return await productsService.recomAProduct(productname);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});





const productState = {
    product: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const productSlice = createSlice({
    name: "product",
    initialState: productState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getAllProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        })
        .addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(addToWishlist.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addToWishlist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.addToWishlist = action.payload;
            state.message = "Product Added to wishlist";
        })
        .addCase(addToWishlist.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getAProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.singproduct = action.payload;
            state.message = "Product Fetched Successfully";
        })
        .addCase(getAProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getAllPro.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllPro.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.allproduct = action.payload;
            state.message = "Product Fetched Successfully";
        })
        .addCase(getAllPro.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(addRating.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addRating.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.rating = action.payload;
            state.message = "Product Fetched Successfully";
            if (state.isSuccess){
                toast.success("Rating add");
            }
        })
        .addCase(addRating.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError) {
                toast.success("No");
            }
        })
        .addCase(recomProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(recomProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.recomproduct = action.payload;
            state.message = "Product Fetched Successfully";
        })
        .addCase(recomProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(exProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(exProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.recomproduct = action.payload;
            state.message = "Product Fetched Successfully";
        })
        .addCase(exProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        
    }
});

export default productSlice.reducer;