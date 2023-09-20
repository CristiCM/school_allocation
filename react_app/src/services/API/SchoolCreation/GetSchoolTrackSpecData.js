//#new
import ApiCall from "../Session/ApiCall";

export const GetSchoolTrackSpecData = async () => {
  return ApiCall('get', '/school_specializations/new', null, {
    'Content-Type': 'application/json'
  });
};
