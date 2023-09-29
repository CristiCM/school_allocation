import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../services/API/Session/LoginUser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from '@tanstack/react-query';
import LoadingComp from '../../components/shared/LoadingComp';
function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {mutate, isLoading} = useMutation({
    mutationFn: (credentials) => {
      return LoginUser(credentials.email, credentials.password);
    },
    onSuccess: (response) => {
      console.log(response);
      sessionStorage.setItem('email', response.data.email);
      sessionStorage.setItem('role', response.data.role);
      sessionStorage.setItem('jwt', response.headers['authorization']);

      if (response.data.role === 'student')
      {
        sessionStorage.setItem('admissionAverage', response.data.admission_average);
        sessionStorage.setItem('enAverage', response.data.en_average);
        sessionStorage.setItem('roGrade', response.data.ro_grade);
        sessionStorage.setItem('mathematicsGrade', response.data.mathematics_grade);
        sessionStorage.setItem('motherTongue', response.data.mother_tongue);
        sessionStorage.setItem('motherTongueGrade', response.data.mother_tongue_grade);
        sessionStorage.setItem('graduationAverage', response.data.graduation_average);
      };

      navigate('/')
      toast.success('Logged in successfully');
    },
    onError: (error) => {
      toast.error(`Failed: ${error.response.data}`);
    },
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate({email, password});
  }

  return (
    isLoading ? 
    <LoadingComp message={"Logging you in..."}/>
    :
    <>
      <Form className='loginFormContainer' onSubmit={handleSubmit}>
        <Form.Label className='loginFormText'>LOGIN</Form.Label>

        <Form.Group className='inputGroup' controlId="formBasicEmail">
          <Form.Label className='inputLable'>Email address</Form.Label>
          <Form.Control
            type="email" 
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group  className='inputGroup' controlId="formBasicPassword">
          <Form.Label className='inputLable'>Password</Form.Label>
          <Form.Control
            type="password" 
            placeholder="***********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className='btn' variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;
