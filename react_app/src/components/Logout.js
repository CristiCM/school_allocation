import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const jwt = localStorage.getItem('jwt');

    try {
      const response = await fetch('http://localhost:3000/users/sign_out', 
      {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${jwt}`,
        }        
      });
      
      const data = await response.json();

      if(data.status.code === 200){
        localStorage.removeItem('user');
        localStorage.removeItem('jwt');

        navigate('/');

        alert(data.status.message);
      } else {
        alert("Failed to log out.");
      }
      
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
