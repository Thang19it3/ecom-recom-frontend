import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice"
import productReducer from "../features/products/productSlice"
import blogReducer from "../features/blog/blogSlice"
import contactReducer from "../features/contact/contactSlice"
import ghtkReducer from "../features/ghtk/GhtkSlice";
import brandReducer from "../features/brand/brandSlice";
import couponReducer from "../features/coupon/couponSlice"
import categoryReducer from "../features/category/categorySlice"
import colorReducer from "../features/color/colorSlice"
import orderReducer from "../features/oders/orderSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        blog: blogReducer,
        contact: contactReducer,
        ghtk: ghtkReducer,
        brand: brandReducer,
        coupon: couponReducer,
        catogory: categoryReducer,
        color: colorReducer,
        order: orderReducer,
    }
})