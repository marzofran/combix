import React from 'react';
import Register from '../../register';
import { Card } from 'react-bootstrap';
import { Form, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import userRegisterForm from '../../../scripts/userRegisterForm';

const RegistrarAUsuario = () => {
  const { handleChange, values, handleSubmit, errors, handleSubmitChofer } =
    userRegisterForm();
  return (
    <Container className={'mt-4'}>
      <Card>
        <Card.Body>
          <div>
            <Card style={{ padding: '22px' }}>
              <Card.Body>
                <Card.Title>
                  <h2>Registrate</h2>
                </Card.Title>
                <Form id={'formularioPPal'} onSubmit={handleSubmitChofer}>
                  <Form.Group controlId='nombre'>
                    <Form.Label>Nombre/s</Form.Label>
                    <Form.Control
                      required
                      type='name'
                      placeholder='Nombre/s'
                      name='nombre'
                      value={values.nombre}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId='apellido'>
                    <Form.Label>Apellido/s </Form.Label>
                    <Form.Control
                      required
                      type='name'
                      placeholder='Apellido/s'
                      name='apellido'
                      value={values.apellido}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group controlId='dni'>
                        <Form.Label>DNI</Form.Label>
                        <Form.Control
                          required
                          type='text'
                          minLength='7'
                          placeholder='DNI'
                          name='dni'
                          value={values.dni}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId='fechaNacimiento'>
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control
                          required
                          type='date'
                          name='fechaNacimiento'
                          value={values.fechaNacimiento}
                          onChange={handleChange}
                        />
                        {errors.fechaNacimiento && (
                          <p>{errors.fechaNacimiento}</p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId='mail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type='email'
                      placeholder='Email'
                      name='mail'
                      value={values.mail}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId='clave'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      required
                      minLength='6'
                      type='password'
                      placeholder='**********'
                      name='clave'
                      value={values.clave}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId='repetirClave'>
                    <Form.Label>Repetir contraseña</Form.Label>
                    <Form.Control
                      required
                      type='password'
                      placeholder='**********'
                      name='repetirClave'
                      value={values.repetirClave}
                      onChange={handleChange}
                    />
                    {errors.repetirClave && <p>{errors.repetirClave}</p>}
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
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegistrarAUsuario;
