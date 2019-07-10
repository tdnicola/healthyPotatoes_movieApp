//imports
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './update-profile.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';


export function UpdateProfile(props) {
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [email, updateEmail] = useState('');
  const [birthday, updateDob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // send a request to the server for authentication
    axios.put(`https://healthypotatoes.herokuapp.com/users/${localStorage.getItem('user')}`, {
      username: username, 
      password: password, 
      birthday: birthday, 
      email: email,
   }, {
       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      const data = res.data;
      console.log(data);
      alert('changed info');
      window.open('/');
    })
    .catch(e => {
      console.log(password);
      alert('error updating user');
    });
  };

  return (
    <Container className='registrationContainer'>
      <Form className='registrationForm'>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => updateEmail(e.target.value)} />
  
        </Form.Group>

        <Form.Group controlId='formBasicUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" value={username} onChange={e => updateUsername(e.target.value)} />
          </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Passwordy" value={password} onChange={e => updatePassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId='formBasicDob'>
        <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" placeholder="01/01/1985" value={birthday} onChange={e => updateDob(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Update me
        </Button>

      </Form>
    </Container>
  );
}
