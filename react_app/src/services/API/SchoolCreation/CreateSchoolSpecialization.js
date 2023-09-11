import axios from  'axios';

export const CreateSchoolSpecialization = async (schoolId, trackId, specializationId, spotsAvailable) => {

    const url = 'http://localhost:3000/school_specializations';

    const data = {
      "school_specialization": {
          "school_id": schoolId,
          "track_id": trackId,
          "specialization_id": specializationId,
          "spots_available": spotsAvailable
      }
    };
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${sessionStorage.getItem('jwt')}`
    };
    
    try {
        const response = await axios.post(url, data, { headers: headers });
    
        if (response.data.status.code === 201) {
            alert(response.data.status.message || "School Specialization Created");
        }

        return response.data.status.message;

    } catch (error) {
        console.error("Error making the API call:", error);
        if (error.response && error.response.data && error.response.data.status && error.response.data.status.message) {
            alert(error.response.data.status.message);
        } else {
            alert("An error occurred. Please try again.");
        }
    }
};
