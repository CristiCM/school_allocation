import Form from 'react-bootstrap/Form';

function SchoolCreationForm() {
    return(
        <>
        <h6>Creation From</h6>
        <Form.Select aria-label="Default select example">
            <option>Select a School</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select>
        <br />
        <Form.Select aria-label="Default select example">
            <option>Select a Track</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select>
        <br />
        <Form.Select aria-label="Default select example">
            <option>Select a specialization</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select>
        </>
    );
}

export default SchoolCreationForm;