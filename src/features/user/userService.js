import axios from "axios";
import { config } from '../../utils/axiosConfig';

const register = async(userData)=>{
    const response = await axios.post(`http://localhost:5000/api/user/register`, userData);
    if (response.data)
    {
        return response.data;
    }
}

const login = async (userData) => {
    const response = await axios.post(`http://localhost:5000/api/user/login`, userData);
    if (response.data) {
        localStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data;
}

const getUserWishList = async () => {
    const response = await axios.get(`http://localhost:5000/api/user/wishlist`, config);
    if (response.data) {
        return response.data;
    }
}

const addToCart = async(cartData) => {
    const response = await axios.post(`http://localhost:5000/api/user/cart`, cartData, config);
    if (response.data) {
        return response.data;
    }
}

const getCart = async () => {
    const response = await axios.get(`http://localhost:5000/api/user/cart`, config);
    if (response.data) {
        return response.data;
    }
}

const removeProductFormCart = async(cartItemId) => {
    const response = await axios.delete(`http://localhost:5000/api/user/delete-product-cart/${cartItemId}`, config);
    if (response.data) {
        return response.data;
    }
}

const updateProductFormCart = async (cartDetail) => {
    const response = await axios.delete(`http://localhost:5000/api/user/update-product-cart/${cartDetail?.cartItemId}/${cartDetail.quantity}`, config);
    if (response.data) {
        return response.data;
    }
}

const getUserOrders = async () => {
    const response = await axios.get(`http://localhost:5000/api/user/getmyorders`,config);
    if (response.data) {
        return response.data;
    }
}

const updateUser = async (data) => {
    const response = await axios.put(`http://localhost:5000/api/user/edit-user`, data, config);
    if (response.data) {
        return response.data;
    }
}
const createOrder = async (data) => {
    const response = await axios.post(`http://localhost:5000/api/user/cart/create-order`, data, config);
    if (response.data) {
        return response.data;
    }
}

const getUsers = async () => {
    const response = await axios.get('http://localhost:5000/api/user/all-users');

    return response.data;
};

const forgotPassToken = async (data) => {
    const response = await axios.post(`http://localhost:5000/api/user/forgot-password-token`, data);
    if (response.data) {
        return response.data;
    }
}



export const authService = {
    register,
    login,
    getUserWishList,
    addToCart,
    getCart,
    removeProductFormCart,
    updateProductFormCart,
    getUserOrders,
    updateUser,
    createOrder,
    getUsers,
    forgotPassToken
}
