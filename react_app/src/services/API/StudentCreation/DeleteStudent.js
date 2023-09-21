// #create
import axios from  'axios';
import { toast } from 'react-toastify';

export const DeleteStudent = async (student_id) => {

    const url = `http://localhost:3000/students/${student_id}`;
 
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${sessionStorage.getItem('jwt')}`
    };
    
    try {
        const response = await axios.delete(url, { headers: headers });
        
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