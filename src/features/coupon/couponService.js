import axios from "axios";



const getCoupon = async () => {
    const response = await axios.get('http://localhost:5000/api/coupon/');
    return response.data;
};


const couponService = {
    getCoupon,
};

export default couponService;