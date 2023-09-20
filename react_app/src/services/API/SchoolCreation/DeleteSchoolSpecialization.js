// #destroy
import ApiCall from "../Session/ApiCall";

export const DeleteSchoolSpecialization = async (school_specialization_id) => {

    return ApiCall('delete',
        `/school_specializations/${school_specialization_id}`,
        null,
        {'Content-Type': 'application/json'},
        null
    );
};
