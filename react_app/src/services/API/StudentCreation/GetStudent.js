//#show
import axios from  'axios';

export const GetStudent = async (id) => {

  const url = `http://localhost:3000/students/${id}`;
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem('jwt')}`
      },
  };      
  
  const response = await axios.get(url, config);

  if (response.status !== 200) {
    throw new Error('Failed to get Student.');
  };

  return response.data.data.student;
};
