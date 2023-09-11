import React, { useContext, useState } from 'react';
import UserJwt from '../shared/UserJwtContext';
import { refresh_jwt_token } from '../../services/API/Session/refreshJwtToken';
import { uploadSchoolSpecializations } from '../../services/API/SchoolCreationImport/UploadSchoolInformationFile';

function ImportSchools() {
  const [jwt, setJwt] = useContext(UserJwt);
  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  async function handleSubmit(event) {
    event.preventDefault()

    if(!jwt) {
      refresh_jwt_token(setJwt);
    }

    const responseData = await uploadSchoolSpecializations(file, jwt);
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
