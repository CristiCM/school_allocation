import React, { useState } from 'react';
import { uploadSchoolSpecializations } from '../../services/API/SchoolCreationImport/UploadSchoolInformationFile';
import Button from 'react-bootstrap/Button';

function ImportSchools() {
  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  async function handleSubmit(event) {
    event.preventDefault()

    const responseData = await uploadSchoolSpecializations(file);

    if(responseData.status.code === 200){
      alert("File imported successfully!");
    } else {
      alert("File import failed!");
    };
  }

  return (
    <div className='tableGeneral'>
        <form onSubmit={handleSubmit}>
          <h1>Upload Data</h1>
          <input type="file" onChange={handleChange}/>
          <Button variant='primary' type="submit">Upload</Button>
        </form>
    </div>
  );
}

export default ImportSchools;
