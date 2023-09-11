// #create
import axios from  'axios';

export const DeleteSchoolSpecialization = async (school_specialization_id) => {

    const url = 'http://localhost:3000/school_specializations' + `/${school_specialization_id}`;
 
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${sessionStorage.getItem('jwt')}`
    };
    
    try {
        const response = await axios.delete(url, { headers: headers });
        
        alert(response.data.status.message);

        return response.data.status.message;

    } catch (error) {
        console.error("Error making the API call:", error);
        if (error.response && error.response.data && error.response.data.status && error.response.data.status.message) {
            alert(error.response.data.status.message);
        } else {
            alert("An error occurred. Please try again.");
        }
    }
};
