import React, { useContext, useState } from 'react';
import UserJwt from '../shared/UserJwtContext';
import { refresh_jwt_token } from '../../services/refreshJwtToken';
import axios from 'axios';
function ImportSchools() {
  const [jwt, setJwt] = useContext(UserJwt);

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    if(!jwt) {refresh_jwt_token(setJwt)};
    event.preventDefault()
    const url = 'http://localhost:3000/school_specialization_import';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `${jwt}`
        },
    };      
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });

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
