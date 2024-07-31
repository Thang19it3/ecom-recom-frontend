import axios from "axios";



const getBrands = async () => {
    const response = await axios.get('http://localhost:5000/api/brand/');
    return response.data;
};


const brandService = {
    getBrands,
};

export default brandService;