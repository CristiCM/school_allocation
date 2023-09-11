import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function AdminNavBar() {
    return(
        <Nav className="me-auto">
        <NavDropdown title="Creation square" id="collasible-nav-dropdown">
          <NavDropdown.Item href="/import_data">Import Data</NavDropdown.Item>
          <NavDropdown.Item href="/specialization_creation">Specialization Creation</NavDropdown.Item>
          <NavDropdown.Item href="/specialization_index">All Specializations</NavDropdown.Item>
          <NavDropdown.Item href="/student_creation">Student Creation</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/scheduler">Scheduler</Nav.Link>
        <Nav.Link href="/allocation_overview">Allocation Overview</Nav.Link>
      </Nav>
    );
}

export default AdminNavBar;