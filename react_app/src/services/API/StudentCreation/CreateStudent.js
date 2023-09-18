// #create
import axios from  'axios';
import { toast } from 'react-toastify';
export const CreateStudent = async (studentData) => {

    const url = 'http://localhost:3000/students';
    
    const data = {
        "user": {
            "email": studentData.email,
            "admission_average": parseFloat(studentData.admission_average),
            "en_average": parseFloat(studentData.en_average),
            "ro_grade": parseFloat(studentData.ro_grade),
            "mathematics_grade": parseFloat(studentData.mathematics_grade),
            "mother_tongue": studentData.motherTongue,
            "mother_tongue_grade": parseFloat(studentData.mother_tongue_grade),
            "graduation_average": parseFloat(studentData.graduation_average)
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
