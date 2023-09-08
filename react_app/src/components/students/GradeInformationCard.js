import { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import UserContext from '../../pages/shared/UserContext';

function GradeInformationCard(){
    const [user,] = useContext(UserContext);

    return(
    // <ul className="noBullets">
    //     <li>Email: {user.email}</li>
    //     <li>Admission_average: {user.admission_average !== null ? user.admission_average : 'N/A'}</li>
    //     <li>EN Average: {user.en_average !== null ? user.en_average : 'N/A'}</li>
    //     <li>Mathematics Grade: {user.mathematics_grade !== null ? user.mathematics_grade : 'N/A'}</li>
    //     <li>Graduation Grade: {user.graduation_average !== null ? user.graduation_average : 'N/A'}</li>
    // </ul>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th colSpan={3}>Grades</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Email:</td>
          <td>{user.data.email}</td>
        </tr>
        <tr>
          <td>Jacob</td>
          <td>Thornton</td>
        </tr>
        <tr>
            <td>Larry the Bird</td>
            <td>Larry the Bird</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default GradeInformationCard;