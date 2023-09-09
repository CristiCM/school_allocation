import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import UserContext from '../../pages/shared/UserContext';

function Logout() {

  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  const handleLogout = async () => {

    try {
      const response = await fetch('http://localhost:3000/users/sign_out', 
      {
        method: 'DELETE',
        headers: {
            'Authorization': `${localStorage.getItem('jwt_token')}`,
        }        
      });
      
      const data = await response.json();

      data.status.code === 200 ? (alert(data.status.message)) : (alert("Failed to log out."))

      navigate('/');

      localStorage.removeItem('data');
      localStorage.removeItem('jwt_token');

      setUser({
        data: null,
        jwt_token: null,
        refresh_token: null
      });

    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    // <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
