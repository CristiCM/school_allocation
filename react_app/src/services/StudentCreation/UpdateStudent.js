//#update
import axios from "axios";
import { toast } from "react-toastify";

export const UpdateStudent = async(id, email, admissionAverage, englishAverage, romanianGrade, mathematicsGrade, motherTongue, motherTongueGrade, graduationAverage) => {

    const url = `http://localhost:3000/students/${id}`;

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
        const response = await axios.put(url, data, { headers: headers });

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
}
