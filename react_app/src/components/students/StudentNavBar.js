import Nav from 'react-bootstrap/Nav';

function StudentNavBar() {
    return(
        <Nav className="me-auto">
            <Nav.Link href="/school_options">School Options</Nav.Link>
            <Nav.Link href="/grades_and_allocation_results">Grades And School Preferences</Nav.Link>
        </Nav>
    );
}

export default StudentNavBar;