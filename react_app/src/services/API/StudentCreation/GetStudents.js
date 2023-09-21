// #index
import ApiCall from '../Session/ApiCall';

export const GetStudents = async (sortBy, order, page) => {
    const params = {
        "sort_by": sortBy === null? 'users.email' : sortBy,
        "order": order === null ? 'DESC' : order,
        "page": page === null ? 1 : page,
    };

    return ApiCall('get', '/students', null, {'Content-Type': 'application/json'}, params);
};
