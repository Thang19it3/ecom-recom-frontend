import axios from "axios";
import {
    config
} from '../../utils/axiosConfig';

const postQuery = async (contactData) => {
    const response = await axios.post(`http://localhost:5000/api/enquiry`, contactData);
    if (response.data) {
        return response.data;
    }
};





export const contactService = {
   postQuery,
}