import axios from "axios";



const getColor = async () => {
    const response = await axios.get('http://localhost:5000/api/color/');
    return response.data;
};


const colorService = {
    getColor,
};

export default colorService;