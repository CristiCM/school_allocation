import axios from 'axios';
import { RefreshJwtToken } from './RefreshJwtToken';

const ApiCall = async (method, url, data = null, headers = {}) => {
  try {
    return await axios({
      method,
      url: `http://localhost:3000${url}`,
      data,
      headers: { ...headers, 'Authorization': sessionStorage.getItem('jwt') }
    });
  } catch (error) {
    if (error.response && error.response.status === 401 && error.response.data.status.message === "Invalid or missing token.") {

      const refreshResponse = await RefreshJwtToken();

      sessionStorage.setItem('jwt', `Bearer ${refreshResponse.data.data.new_jwt_token}`);

      return axios({
        method,
        url: `http://localhost:3000${url}`,
        data,
        headers: { ...headers, 'Authorization': sessionStorage.getItem('jwt') }
      });
    }
    throw error;
  }
};

export default ApiCall;
