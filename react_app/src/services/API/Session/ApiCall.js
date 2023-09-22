import axios from 'axios';
import { RefreshJwtToken } from './RefreshJwtToken';

const ApiCall = async (method, url, data = null, headers = {}, params = null, responseType = 'json') => {
  try {
    return await axios({
      method,
      url: `http://localhost:3000${url}`,
      data,
      params,
      headers: { ...headers, 'Authorization': sessionStorage.getItem('jwt') },
      responseType
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const refreshResponse = await RefreshJwtToken();
      sessionStorage.setItem('jwt', `Bearer ${refreshResponse.data.new_jwt_token}`);
      return axios({
        method,
        url: `http://localhost:3000${url}`,
        data,
        params,
        headers: { ...headers, 'Authorization': sessionStorage.getItem('jwt') },
        responseType
      });
    }
    throw error;
  }
};

export default ApiCall;
