// #create
import ApiCall from '../Session/ApiCall';

export const CreateSchoolSpecialization = async (schoolId, trackId, specializationId, spotsAvailable) => {
    const data = {
        "school_specialization": {
            "school_id": schoolId,
            "track_id": trackId,
            "specialization_id": specializationId,
            "spots_available": spotsAvailable
        }
    };

    return ApiCall('post', '/school_specializations', data, {
        'Content-Type': 'application/json'
    });
};
