import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './userService';
import { toast } from 'react-toastify';



export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserProductWishlist = createAsyncThunk("user/wishlist", async (thunkAPI) => {
    try {
        return await authService.getUserWishList();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addProdCart = createAsyncThunk("user/cart/add", async (cartData,thunkAPI) => {
    try {
        return await authService.addToCart(cartData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserCart = createAsyncThunk("user/cart/get", async ( thunkAPI) => {
    try {
        return await authService.getCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteCartproduct = createAsyncThunk("user/cart/product/delete", async (cartItemId, thunkAPI) => {
    try {
        return await authService.removeProductFormCart(cartItemId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateCartproduct = createAsyncThunk("user/cart/product/update", async (cartDetail, thunkAPI) => {
    try {
        return await authService.updateProductFormCart(cartDetail);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrders = createAsyncThunk("user/order/get", async ( thunkAPI) => {
    try {
        return await authService.getUserOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAlllUser = createAsyncThunk("user/order/getAlluser", async (thunkAPI) => {
    try {
        return await authService.getUsers();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createAnOrders = createAsyncThunk("user/create-order", async (data,thunkAPI) => {
    try {
        return await authService.createOrder(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateProfile = createAsyncThunk("user/profile/update", async (data,thunkAPI) => {
    try {
        return await authService.updateUser(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const forgotPasswordToken = createAsyncThunk("user/profile/forgot", async (data, thunkAPI) => {
    try {
        return await authService.forgotPassToken(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const getCustomerformLocalStorage = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null;

const initialState = {
    user: getCustomerformLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(registerUser.pending,  (state)=>{
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdUser = action.payload;
            if ( state.isSuccess === true) {
                toast.info("User Created Successfully");
            }
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError === true) {
                toast.info(action.error);
            }
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            if ( state.isSuccess === true) {
                localStorage.setItem("token", action.payload.token);
                toast.info("User login Successfully");
            }
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError === true) {
                toast.info(action.error);
            }
        })
        .addCase(getUserProductWishlist.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUserProductWishlist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.wishlist = action.payload;
        })
        .addCase(getUserProductWishlist.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(addProdCart.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addProdCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cartProduct = action.payload;
            if  ( state.isSuccess) {
                toast.success("Product Added To Cart");
            }
        })
        .addCase(addProdCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getUserCart.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUserCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cartProducts = action.payload;
        })
        .addCase(getUserCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteCartproduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteCartproduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deleteCartProduct = action.payload;
            if(state.isSuccess){
                toast.success("Product Deleted Form Cart Successfully!")
            }
        })
        .addCase(deleteCartproduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isError) {
                toast.error("Something went wrong!")
            }
        })
        .addCase(updateCartproduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateCartproduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updateCartProduct = action.payload;
        })
        .addCase(updateCartproduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
         .addCase(updateProfile.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updateUser = action.payload;
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createAnOrders.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createAnOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.orderProduct = action.payload;
            if  ( state.isSuccess) {
                toast.success("Order suss");
            }
        })
        .addCase(createAnOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getOrders.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.getOrderUser = action.payload;
        })
        .addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getAlllUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAlllUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.getAllUser = action.payload;
        })
        .addCase(getAlllUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(forgotPasswordToken.pending, (state) => {
            state.isLoading = true
        })
        .addCase(forgotPasswordToken.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.token = action.payload;
            if (state.isSuccess) {
                toast.success("Forgot password email sent")
            }
        })
        .addCase(forgotPasswordToken.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        
        
    }
});

export default authSlice.reducer;