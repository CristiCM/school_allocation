import { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import UserJwt from '../shared/UserJwtContext';

function GradeInformationCard(){
    const [jwt, setJwt] = useContext(UserJwt);
    // USE EFFECT TO FETCH STUDENT INFORMATION
    return(
      <h1>Student Grades</h1>
    // <div className='tableGeneral'>
    //   <Table striped bordered hover variant="dark" >
    //     <thead>
    //       <tr>
    //         <th colSpan={3}>Grades</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>Admission average</td>
    //         <td>{user.data.admission_average}</td>
    //       </tr>
    //       <tr>
    //         <td>Graduation Average</td>
    //         <td>{user.data.graduation_average}</td>
    //       </tr>
    //       <tr>
    //           <td>English Average</td>
    //           <td>{user.data.en_average}</td>
    //       </tr>
    //       <tr>
    //           <td>Romanian Grade</td>
    //           <td>{user.data.ro_grade}</td>
    //       </tr>
    //       <tr>
    //         <td>Mathematics Grade</td>
    //         <td>{user.data.mathematics_grade}</td>
    //       </tr>

    //       <tr>
    //         {user.data.mother_tongue ? (
    //           <>
    //             <td>Mother Tongue</td>
    //             <td>{user.data.mother_tongue}</td>
    //           </>
    //         ) : null}
    //       </tr>
    //       <tr>
    //         {user.data.mother_tongue_grade ? (
    //           <>
    //             <td>Mother Tongue Grade</td>
    //             <td>{user.data.mother_tongue_grade}</td>
    //           </>
    //         ) : null}
    //       </tr>
    //     </tbody>
    //   </Table>
    // </div>
  );
}

export default GradeInformationCard;