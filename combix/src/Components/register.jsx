import React from 'react';
import {Form, Card, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Axios from 'axios';

const Register = () => {
 const handleSubmit = event => {
    event.preventDefault();

    Axios
      .post('/users', { message: 'Hello' })
      .then(response => { 
        console.log(response)
      })
  }

  return (
    <div>
      <Card style={{padding: '22px'}}>
        <Card.Body>
          <Card.Title>
            <h2>Registrate</h2>
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='nombre'>
              <Form.Label>Nombre/s</Form.Label>
              <Form.Control type='name' placeholder='Nombre/s' />
            </Form.Group>
            <Form.Group controlId='apellido'>
              <Form.Label>Apellido/s</Form.Label>
              <Form.Control type='name' placeholder='Apellido/s' />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId='dni'>
                  <Form.Label>Dni</Form.Label>
                  <Form.Control type='text' placeholder='Dni' />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='nacimiento'>
                  <Form.Label>Fecha de nacimiento</Form.Label>
                  <Form.Control type='date' placeholder='Fecha de nacimiento' />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId='contraseña'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type='password' placeholder='*********' />
            </Form.Group>
            <Form.Group controlId='contraseñaRepeat'>
              <Form.Label>Repetir contraseña</Form.Label>
              <Form.Control type='password' placeholder='*********' />
            </Form.Group>
            <Row>
              <Col lg='8'>
                <button
                  className='btn btn-primary buttonGradient'
                  variant='primary'
                  type='submit'
                >
                  Registrate
                </button>
              </Col>
              <Col>
                <Link className='btn btn-outline-light buttonLogin' to='/login'>
                  iniciar sesion
                  <p>
                    <i className='fa fa-arrow-right' aria-hidden='true'></i>
                  </p>
                </Link>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
