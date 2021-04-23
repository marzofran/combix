import React from 'react';
import {Form, Button} from 'react-bootstrap';
const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Registrado');
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='nombre'>
          <Form.Label>Nombre/s</Form.Label>
          <Form.Control type='email' placeholder='Nombre/s' />
        </Form.Group>
        <Form.Group controlId='apellido'>
          <Form.Label>Apellido/s</Form.Label>
          <Form.Control type='email' placeholder='Apellido/s' />
        </Form.Group>
        <Form.Group controlId='dni'>
          <Form.Label>Dni</Form.Label>
          <Form.Control type='email' placeholder='Dni' />
        </Form.Group>
        <Form.Group controlId='nacimiento'>
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control type='email' placeholder='Fecha de nacimiento' />
        </Form.Group>
        <Form.Group controlId='contraseña'>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type='email' placeholder='*********' />
        </Form.Group>
        <Form.Group controlId='contraseña'>
          <Form.Label>Repetir contraseña</Form.Label>
          <Form.Control type='email' placeholder='*********' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Registrate
        </Button>
        <Button variant='primary'>iniciar sesion</Button>
      </Form>
    </div>
  );
};

export default Register;
