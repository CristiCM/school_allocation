//#update
import ApiCall from "../Session/ApiCall";

export const UpdateStudent = async(studentData) => {
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

    return ApiCall('put', `/students/${studentData.id}`, data, {'Content-Type': 'application/json'});
}
