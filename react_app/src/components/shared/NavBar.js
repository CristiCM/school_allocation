import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logout from './Logout';
import AdminNavBar from '../admins/AdminNavBar';
import StudentNavBar from '../students/StudentNavBar';
import { useContext } from 'react';
import UserContext from '../../pages/shared/UserContext';

function NavBar() {
  const [user,] = useContext(UserContext);

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">School Allocation 2023</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          {user.data && user.data.role === 'admin' ?
            <AdminNavBar /> :
            user.data && user.data.role === 'student' ?
            <StudentNavBar /> :
            null}

          <Nav>
            <Nav.Link href="/user_credentials_edit">{user.data? user.data.email : null}</Nav.Link>
            { user.data ?
                  (<Logout />)
                  // (<Nav.Link> <Logout /> </Nav.Link>)
                  : 
                  (<Nav.Link href="/login">Login</Nav.Link>) 
            }
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;