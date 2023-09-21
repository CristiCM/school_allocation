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
      <Form className='loginform' onSubmit={handleSubmit}>
        <Form.Label>LOGIN</Form.Label>
        <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;
