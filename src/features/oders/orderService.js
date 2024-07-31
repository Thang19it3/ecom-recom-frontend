import axios from "axios";
import { config } from '../../utils/axiosConfig';



const updateOrder = async (order) => {
    console.log(order);
    const response = await axios.put(
        `http://localhost:5000/api/order/${order.id}`, {
            orderStatus: order.orderStatus,
        },
        config
    );

    return response.data;
};


const orderService = {
   
    updateOrder,
};

export default orderService;