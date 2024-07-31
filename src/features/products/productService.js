import axios from "axios";
import { config } from '../../utils/axiosConfig';

const getProducts = async (data) => {
    console.log(data)
    const response = await axios.get(`http://localhost:5000/api/product?${data?.brand?`brand=${data?.brand}&&`: ""}${data?.tags?`tags=${data?.tags}&&`: ""}${data?.category?`category=${data?.category}&&`: ""}${data?.page?`page=${data?.page}&&`: ""}${data?.limit?`limit=${data?.limit}&&`: ""}${data?.minPrice?`price[gte]=${data?.minPrice}&&`: ""}${data?.maxPrice?`price[lte]=${data?.maxPrice}&&`: ""}${data?.sort?`sort=${data?.sort}&&`: ""}`);
    if (response.data) {
        return response.data;
    }
};

const getAllProducts = async (data) => {
    console.log(data)
    const response = await axios.get(`http://localhost:5000/api/product/all-product`);
    if (response.data) {
        return response.data;
    }
};

const getSingProduct = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/product/${id}`);
    if (response.data) {
        return response.data;
    }
}

const addToWishlist = async (prodId) => {
    const response = await axios.put(`http://localhost:5000/api/product/wishlist`, { prodId }, config);
    console.log(response.data);
    if (response.data) {
        return response.data;
    }
};
const rateProduct = async(data) => {
    const response = await axios.put(`http://localhost:5000/api/product/rating`, data, config);
    if (response.data) {
        return response.data;
    }
}

const recomProduct = async () => {
    const response = await axios.get('http://127.0.0.1:5000');
    if (response.data) {
        return response.data;
    }
}

const recomAProduct = async (productname) => {
    const response = await axios.get('http://127.0.0.1:5000/product',{
        params: {
            book_name: productname
        }
    });
    if (response.data) {
        return response.data;
    }
}
const exProduct = async () => {
    const response = await axios.get('http://localhost:5000/api/product/export-product-title');
    if (response.data) {
        return response.data;
    }
}




export const productsService = {
    getProducts,
    getSingProduct,
    addToWishlist,
    rateProduct,
    getAllProducts,
    recomProduct,
    recomAProduct,
    exProduct
}