import ApiCall from "../Session/ApiCall";

export const GetAllSchoolSpecializations = async() => {
    return ApiCall('get', '/school_specializations/all_specializations', null, {'Content-Type': 'application/json'});
}