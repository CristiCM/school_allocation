import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function AdminNavBar() {
    return(
        <Nav className="me-auto">
        <NavDropdown title="CREATION SQUARE" id="collasible-nav-dropdown">
          <NavDropdown.Item href="/import_data">IMPORT DATA</NavDropdown.Item>
          <NavDropdown.Item href="/specialization_creation">SPECIALIZATION CREATION</NavDropdown.Item>
          <NavDropdown.Item href="/specialization_index">ALL SPECIALIZATIONS</NavDropdown.Item>
          <NavDropdown.Item href="/student_creation">STUDENT CREATION</NavDropdown.Item>
          <NavDropdown.Item href="/student_index">ALL STUDENTS</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/scheduler">SCHEDULER</Nav.Link>
        <Nav.Link href="/allocation_overview">ALLOCATION OVERVIEW</Nav.Link>
      </Nav>
    );
}

export default AdminNavBar;