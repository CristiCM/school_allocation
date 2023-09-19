// #create
import axios from  'axios';
import { toast } from 'react-toastify';

export const ResetAllocation = async () => {

    const url = `http://localhost:3000/assignments_reset/1`;
 
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${sessionStorage.getItem('jwt')}`
    };
    
    try {
        const response = await axios.delete(url, { headers: headers });
        
        toast.success(response.data.status.message);

        return response.data.status.message;

    } catch (error) {
        console.error("Error making the API call:", error);
        if (error.response && error.response.data && error.response.data.status && error.response.data.status.message) {
            toast.error(error.response.data.status.message);
        } else {
            toast.error("An error occurred. Please try again.");
        }
    }
};
