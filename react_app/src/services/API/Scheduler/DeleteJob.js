// #destroy
import axios from  'axios';
import { toast } from 'react-toastify';
export const DeleteJob = async (type) => {

    const url = `http://localhost:3000/jobs/1`;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${sessionStorage.getItem('jwt')}`
        },
        data: {
            "type": type 
        }
    };
    
    try {
        const response = await axios.delete(url, config);
    
        response.data.status.code === 200 ?
        toast.success(response.data.status.message) :
        toast.error(response.data.status.message);

    } catch (error) {
        console.error("Error making the API call:", error);
        if (error.response && error.response.data && error.response.data.status && error.response.data.status.message) {
            toast.error(error.response.data.status.message);
        } else {
            toast.error("An error occurred. Please try again.");
        }
    }
};
