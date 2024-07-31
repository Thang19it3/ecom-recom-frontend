import axios from "axios";
import {
    config
} from '../../utils/axiosConfig';

const getBlogs = async () => {
    const response = await axios.get(`http://localhost:5000/api/blog`);
    if (response.data) {
        return response.data;
    }
};

const getBlog = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
    if (response.data) {
        return response.data;
    }
};



export const blogService = {
    getBlogs,
    getBlog
}