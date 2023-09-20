import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UploadSchoolSpecializations } from '../../../services/API/SchoolCreationImport/UploadSchoolInformationFile';
import { useMutation } from '@tanstack/react-query';
import LoadingComp from '../../shared/LoadingComp';

function ImportSchools() {
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const uploadSchoolSpecializationsMutation = useMutation({
    mutationFn: (file) => {
      return UploadSchoolSpecializations(file);
    },
    onSuccess: (response) => {
      toast.success(response.data.status.message);
      navigate("/specialization_creation");
    },
    onError: (error) => {
      toast.error(error.response.data.status.message);
    },
  });

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    uploadSchoolSpecializationsMutation.mutate(file);

  }

  return (
    uploadSchoolSpecializationsMutation.isLoading ?
    <LoadingComp message={"Uploading file..."} />
    :
    <>
      <div className='pageInfo'>
        <h1>Upload Data</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>The only acceptable format is '.csv'</Form.Label>
          <Form.Control type="file" className="mb-3" onChange={handleChange} />
          <Button variant='dark' type="submit">Upload</Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default ImportSchools;
