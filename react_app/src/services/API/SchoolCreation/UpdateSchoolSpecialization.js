//#update
import ApiCall from "../Session/ApiCall";

export const UpdateSchoolSpecialization = async(id, schoolId, trackId, specializationId, spotsAvailable) => {
    const data = {
        "school_specialization": {
            "school_id": schoolId,
            "track_id": trackId,
            "specialization_id": specializationId,
            "spots_available": spotsAvailable
        }
      };
    
    return ApiCall('patch', `/school_specializations/${id}`, data, {
        'Content-Type': 'application/json'
    });
}
