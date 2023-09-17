// #create
import axios from  'axios';
import { toast } from 'react-toastify';
export const CreateStudent = async (email, admissionAverage, englishAverage, romanianGrade, mathematicsGrade, motherTongue, motherTongueGrade, graduationAverage) => {

    const url = 'http://localhost:3000/students';

    const data = {
      "user": {
          "email": email,
          "admission_average": admissionAverage,
          "en_average": englishAverage,
          "ro_grade": romanianGrade,
          "mathematics_grade": mathematicsGrade,
          "mother_tongue": motherTongue,
          "mother_tongue_grade": motherTongueGrade,
          "graduation_average": graduationAverage
      }
    };
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${sessionStorage.getItem('jwt')}`
    };
    
    try {
        const response = await axios.post(url, data, { headers: headers });
    
        response.data.status.code === 201 ? 
            toast.success(response.data.status.message || "Student account created.") :
            response.data.status.code === 400 ?
            toast.error(response.data.status.message || "Email has already been taken!") :
            toast.error("An error occured");

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
