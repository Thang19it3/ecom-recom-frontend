import axios from "axios";



const getCategory = async () => {
    const response = await axios.get('http://localhost:5000/api/category/');
    return response.data;
};


const categoryService = {
    getCategory,
};

export default categoryService;