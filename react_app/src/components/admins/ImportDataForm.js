import React, { useState } from 'react';
import { uploadSchoolSpecializations } from '../../services/API/SchoolCreationImport/UploadSchoolInformationFile';

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
    <div>
        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}

export default ImportSchools;
