//#show
import ApiCall from "../Session/ApiCall";

export const GetSchoolSpecialization = async (id) => {
  return ApiCall('get', `/school_specializations/${id}`, null, {
    'Content-Type': 'application/json'
  });  
};
