import ApiCall from "../Session/ApiCall";

export const GetPreferences = () => {

    return ApiCall('get', '/preferences', null, {'Content-Type': 'application/json'});
}