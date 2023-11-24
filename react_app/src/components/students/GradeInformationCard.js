import Table from 'react-bootstrap/Table';

function GradeInformationCard(){

    return(
      <div className="tableGeneral">
        <Table striped bordered hover variant="dark" >
          <thead>
            <tr>
              <th colSpan={2}>Grades</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Admission average</td>
              <td >{sessionStorage.getItem('admissionAverage')}</td>
            </tr>
            <tr>
              <td>Graduation Average</td>
              <td>{sessionStorage.getItem('graduationAverage')}</td>
            </tr>
            <tr>
                <td>English Average</td>
                <td>{sessionStorage.getItem('enAverage')}</td>
            </tr>
            <tr>
                <td>Romanian Grade</td>
                <td>{sessionStorage.getItem('roGrade')}</td>
            </tr>
            <tr>
              <td>Mathematics Grade</td>
              <td>{sessionStorage.getItem('mathematicsGrade')}</td>
            </tr>

            <tr>
                <td>Mother Tongue</td>
                <td>{sessionStorage.getItem('motherTongue') !== "null" ? sessionStorage.getItem('motherTongue') : '-'}</td>
            </tr>
            <tr>
                <td>Mother Tongue Grade</td>
                <td>{sessionStorage.getItem('motherTongueGrade') !== "null" ? sessionStorage.getItem('motherTongueGrade') : '-'}</td>
            </tr>

          </tbody>
        </Table>
      </div>
  );
}

export default GradeInformationCard;