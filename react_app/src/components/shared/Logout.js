import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function Logout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    try {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('jwt');

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
