//#show
import axios from  'axios';

export const GetJobs = async () => {

  const url = "http://localhost:3000/jobs/1";
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

  return response.data.data.job;
};
