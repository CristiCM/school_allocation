// #index
import axios from  'axios';
import { toast } from 'react-toastify';

export const GetStudents = async (sortBy, order, page) => {

    const url = 'http://localhost:3000/students';

    const data = {
        "sortBy": sortBy === null? 'users.email' : sortBy,
        "order": order === null ? 'DESC' : order,
        "page": page === null ? 1 : page,
    };
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${sessionStorage.getItem('jwt')}`
    };
    
    try {
        const response = await axios.get(url, { params: data, headers: headers });

        return response.data;

    } catch (error) {
        console.error("Error making the API call:", error);
        if (error.response && error.response.data && error.response.data.status && error.response.data.status.message) {
            toast.error(error.response.data.status.message);
        } else {
            toast.error("An error occurred. Please try again.");
        }
    }
};
