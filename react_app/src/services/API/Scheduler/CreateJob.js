// #create
import ApiCall from "../Session/ApiCall";

export const CreateJob = async (type, time) => {
    const data = {
      "job": {
          [type]: time
      }
    };

    return ApiCall('post', '/jobs', data, {'Content-Type': 'application/json'});
};
