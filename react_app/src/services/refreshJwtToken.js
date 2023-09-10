export const refresh_jwt_token = async (setJwt) => {
    try{
        const response = await fetch('http://localhost:3000/refresh_jwt', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
            throw new Error('Failed to refresh JWT.');
        }

        const newJwt = await response.json();
        setJwt(newJwt.data.new_jwt_tokne);
        return true;

    } catch (error) {
        console.error('Error refreshing JWT:', error);
        return false;
    }
};
