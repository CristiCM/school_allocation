import axios from  'axios';

export const LoginUser = async (email, password) => {
  return await axios({
    method: 'post',
    url: 'http://localhost:3000/users/sign_in',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      user: {
        email,
        password
      }
    }
  });
};
