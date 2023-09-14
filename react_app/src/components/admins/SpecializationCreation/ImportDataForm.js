import React, { useState } from 'react';
import { uploadSchoolSpecializations } from '../../../services/API/SchoolCreationImport/UploadSchoolInformationFile';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

function ImportSchools() {
  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  async function handleSubmit(event) {
    event.preventDefault()

    const responseData = await uploadSchoolSpecializations(file);

    if(responseData.status.code === 200){
      toast.success("File imported successfully!");
    } else {
      toast.error("File import failed!");
    };
  }

  return (
    <>
      <div className='pageInfo'>
        <h1>Upload Data</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange}/>
        <Button variant='dark' type="submit">Upload</Button>
      </form>
    </>
  );
}

export default ImportSchools;
