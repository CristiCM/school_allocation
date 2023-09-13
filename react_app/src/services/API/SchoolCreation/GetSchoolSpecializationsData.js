// #index
import axios from  'axios';

export const GetSchoolSpecializationsData = async (order, page) => {

    const url = 'http://localhost:3000/school_specializations';

    const data = {
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
            alert(error.response.data.status.message);
        } else {
            alert("An error occurred. Please try again.");
        }
    }
};
