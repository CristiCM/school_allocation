function GradeInformationCard(){

    return(
      <div className='tableContainer'>
      <table>
        <caption>Your grades</caption>
        <thead>
        </thead>
        <tbody>
          <tr>
            <td data-hide>Admission average</td>
            <td data-cell="admission average">{sessionStorage.getItem('admissionAverage')}</td>
          </tr>
          <tr>
            <td data-hide>Graduation Average</td>
            <td data-cell="graduation average">{sessionStorage.getItem('graduationAverage')}</td>
          </tr>
          <tr>
              <td data-hide>English Average</td>
              <td data-cell="english average">{sessionStorage.getItem('enAverage')}</td>
          </tr>
          <tr>
              <td data-hide>Romanian Grade</td>
              <td data-cell="romanian grade">{sessionStorage.getItem('roGrade')}</td>
          </tr>
          <tr>
            <td data-hide>Mathematics Grade</td>
            <td data-cell="mathematics grade">{sessionStorage.getItem('mathematicsGrade')}</td>
          </tr>

          <tr>
            {sessionStorage.getItem('motherTongue') !== "null" ? (
              <>
                <td data-hide>Mother Tongue</td>
                <td data-cell="mother tongue">{sessionStorage.getItem('motherTongue')}</td>
              </>
            ) : 
              <>
                  <td data-hide>Mother Tongue</td>
                  <td data-cell="mother tongue">N/A</td>
              </>
            }
          </tr>
          <tr>
            {sessionStorage.getItem('motherTongueGrade') !== "null" ? (
              <>
                <td data-hide>Mother Tongue Grade</td>
                <td data-cell="mother tongue grade">{sessionStorage.getItem('motherTongueGrade')}</td>
              </>
            ) : 
            <>
            <td data-hide>Mother Tongue Grade</td>
            <td data-cell="mother tongue grade">N/A</td>
            </>}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GradeInformationCard;