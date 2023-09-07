import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logout from './Logout';
import AdminNavBar from '../admins/AdminNavBar';
import StudentNavBar from '../students/StudentNavBar';

function NavBar() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">School Allocation 2023</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          {user && user.role === 'admin' ?
            <AdminNavBar /> :
            user && user.role === 'student' ?
            <StudentNavBar /> :
            null}

          <Nav>
            <Nav.Link href="/user_credentials_edit">{user? user.email : null}</Nav.Link>
            { user ?
                  (<Logout />)
                  // (<Nav.Link> <Logout /> </Nav.Link>)
                  : 
                  (<Nav.Link eventKey={2} href="/login">Login</Nav.Link>) 
            }
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;