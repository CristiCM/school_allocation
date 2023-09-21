// #delete
import ApiCall from '../Session/ApiCall';

export const DeleteStudent = async (student_id) => {
    return ApiCall('delete', `/students/${student_id}`, {'Content-Type': 'application/json'});
};
