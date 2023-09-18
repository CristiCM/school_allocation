// #create
import axios from  'axios';
import { toast } from 'react-toastify';
export const CreateJob = async (type, time) => {

    const url = 'http://localhost:3000/jobs';

    const data = {
      "job": {
          [type]: time
      }
    };
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${sessionStorage.getItem('jwt')}`
    };
    
    try {
        const response = await axios.post(url, data, { headers: headers });
    
        response.data.status.code === 201 ?
        toast.success(response.data.status.message) :
        toast.error(response.data.status.message);
        
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
