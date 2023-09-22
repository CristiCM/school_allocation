//#show
import ApiCall from "../Session/ApiCall";

export const GetJobs = async () => {
  return ApiCall('get', '/jobs/1', null, {'Content-Type': 'application/json'});
};
