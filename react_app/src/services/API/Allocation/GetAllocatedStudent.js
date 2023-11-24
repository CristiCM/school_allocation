import ApiCall from "../Session/ApiCall";

export const GetAllocatedStudent = async(id) => {
    return ApiCall('get', `/assignments/${id}`, null, {'Content-Type': 'application/json'});
}