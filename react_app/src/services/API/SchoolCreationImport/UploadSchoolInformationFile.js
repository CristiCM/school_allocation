import axios from 'axios';

export const uploadSchoolSpecializations = async (file, jwt) => {
  const url = 'http://localhost:3000/school_specialization_import';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', file.name);
  const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `${jwt}`
      },
  };      
  
  const response = await axios.post(url, formData, config);
  return response.data;
};
