import ApiCall from "../Session/ApiCall";

export const DownloadAllocatedStudents = async (sortBy, order) => {
    const params = {
        "sort_by": sortBy,
        "order": order
    };

    const response =  await ApiCall('get', '/assignments/download', null, {}, params, 'blob');
    return response.data;
}
