import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import UserJwt from './UserJwtContext';
import axios from 'axios';

function LoginForm() {
  const [, setJwt] = useContext(UserJwt)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/users/sign_in',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          user: {
            email,
            password
          }
        }
      });

      if (response.data.status.code === 200) {
        sessionStorage.setItem('email', response.data.data.email);
        sessionStorage.setItem('role', response.data.data.role);
        setJwt(response.headers['Authorization'])
        navigate('/')
        alert(response.data.status.message);
      } else {
        alert('Login failed.');
      }
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      alert('An error occurred. Please try again.');
    }
  }
    

  return (
    <Form className='loginform' onSubmit={handleSubmit}>
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;
