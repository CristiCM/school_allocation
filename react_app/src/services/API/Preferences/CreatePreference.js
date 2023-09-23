import ApiCall from '../Session/ApiCall';

export const CreatePreference = async (school_spec_id, priority) => {
    const data = {
        "preference": {
            "school_specialization_id": school_spec_id,
            "priority": priority
        }
    };

    return ApiCall('post', '/preferences', data, {'Content-Type': 'application/json'});
}