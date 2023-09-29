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

  const {mutate, isLoading} = useMutation({
    mutationFn: (file) => {
      return UploadSchoolSpecializations(file);
    },
    onSuccess: () => {
      toast.success('File uploaded successfully');
      navigate("/specialization_creation");
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Failed: ${error.response.statusText}`);
    },
  });

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    mutate(file);

  }

  return (
    isLoading ?
    <LoadingComp message={"Uploading file..."} />
    :
    <>
      <Form className='importFormContainer' onSubmit={handleSubmit}>
        <Form.Label className='importInfoLable'><h3>Upload Data</h3></Form.Label>
        <Form.Group controlId="formFile" className="importFormGroup">
          <Form.Label className='importExtensionLable'>The only acceptable format is '.csv'</Form.Label>
          <Form.Control type="file" className="importFormControl" onChange={handleChange} />
          <Button variant='dark' type="submit" className='importBtn'>Upload</Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default ImportSchools;
