import axios from 'axios';

export const refresh_jwt_token = async (setJwt) => {
    try {
        const response = await axios.post('http://localhost:3000/refresh_jwt', {}, {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'}
        });

        if (response.status !== 200) {
            throw new Error('Failed to refresh JWT.');
        }

        setJwt("Barer " + response.data.data.new_jwt_token);
        return true;

    } catch (error) {
        console.error('Error refreshing JWT:', error);
        return false;
    }
};
