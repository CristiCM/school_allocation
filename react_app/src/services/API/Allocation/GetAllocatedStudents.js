// #index
import ApiCall from "../Session/ApiCall";

export const GetAllocatedStudents = async (sortBy, order, page) => {
    const params = {
        "sort_by": sortBy === null? 'users.email' : sortBy,
        "order": order === null ? 'DESC' : order,
        "page": page === null ? 1 : page,
    };
    
    return ApiCall('get', '/assignments', null, {'Content-Type': 'application/json'}, params);
};