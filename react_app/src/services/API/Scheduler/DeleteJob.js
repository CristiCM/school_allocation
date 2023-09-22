// #destroy
import ApiCall from "../Session/ApiCall";

export const DeleteJob = async (type) => {
    const params = {
        type: type 
    };    

    return ApiCall('delete', '/jobs/1', null, {'Content-Type': 'application/json'}, params);
};
