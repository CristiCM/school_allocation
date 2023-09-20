import ApiCall from "../Session/ApiCall";

export const DownloadSchoolSpecializations = async (order) => {
    const params = { "order": order };
    const response = await ApiCall('get', '/school_specializations/download', null, {}, params, 'blob');
    return response.data;
}