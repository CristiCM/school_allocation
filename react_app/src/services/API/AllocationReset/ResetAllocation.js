// #delete
import ApiCall from "../Session/ApiCall";

export const ResetAllocation = async () => {
    return ApiCall('delete', '/assignments_reset/1', null, {'Content-Type': 'application/json'});
};
