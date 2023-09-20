// #index
import ApiCall from '../Session/ApiCall';

export const GetSchoolSpecializationsData = async (order, page) => {
    const params = {
        "order": order === null ? 'DESC' : order,
        "page": page === null ? 1 : page,
    };

    return ApiCall('get','/school_specializations',
        null, 
        {'Content-Type': 'application/json'},
        params
    );
};