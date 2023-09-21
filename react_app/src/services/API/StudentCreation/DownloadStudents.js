import ApiCall from "../Session/ApiCall";

export const DownloadStudents = async (sortBy, order) => {
    const params = {
        "sort_by": sortBy,
        "order": order
    };
    const response =  await ApiCall('get', '/students/download', null, {}, params, 'blob');
    return response.data;
}
