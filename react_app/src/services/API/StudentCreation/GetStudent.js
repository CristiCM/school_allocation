//#show
import ApiCall from "../Session/ApiCall";

export const GetStudent = async (id) => {
  return ApiCall('get', `/students/${id}`, null, {'Content-Type': 'application/json'});
};
