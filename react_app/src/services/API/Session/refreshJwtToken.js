import axios from 'axios';

export const RefreshJwtToken = async () => {
    return await axios({
        method: 'post',
        url: 'http://localhost:3000/refresh_jwt',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    })
}
