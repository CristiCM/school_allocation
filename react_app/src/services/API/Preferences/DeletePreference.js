import ApiCall from "../Session/ApiCall";

export const DeletePreference = async (id) => {
    return ApiCall('delete', `/preferences/${id}`, null, {'Content-Type': 'application/json'});
}