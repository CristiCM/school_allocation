//#new
import axios from  'axios';

export const GetSchoolTrackSpecData = async () => {

  const url = 'http://localhost:3000/school_specializations/new';
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem('jwt')}`
      },
  };      
  
  const response = await axios.get(url, config);

  if (response.status !== 200) {
    throw new Error('Failed to get School/Track/Specialization Data.');
  };

  return response.data.data;
};
