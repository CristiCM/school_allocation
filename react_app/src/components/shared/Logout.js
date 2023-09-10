import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import UserJwt from './UserJwtContext';

function Logout() {

  const navigate = useNavigate();
  const [, setJwt] = useContext(UserJwt);

  const handleLogout = () => {
    try {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('role');
        setJwt(""); // Clear the JWT from context state
        alert("Successfully logged out.");
        navigate('/');
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
