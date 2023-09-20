import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { toast } from 'react-toastify';

function Logout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('jwt');

    toast.success("Successfully logged out.");
    navigate('/');
  };

  return (
    <>
      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </>
  );
}

export default Logout;
