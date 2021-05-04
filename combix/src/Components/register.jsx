import React from 'react';
import {Form, Card, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import userRegisterForm from '../scripts/userRegisterForm';

const Register = () => {
  const {handleChange, values, handleSubmit, errors} = userRegisterForm();

  return (
    <div>
      <Card style={{padding: '22px'}}>
        <Card.Body>
          <Card.Title>
            <h2>Registrate</h2>
          </Card.Title>
          <Form id={'formularioPPal'} onSubmit={handleSubmit}>
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
                  <Form.Label>Dni</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    minLength='7'
                    placeholder='Dni'
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
                    placeholder='Fecha de nacimiento'
                    name='fechaNacimiento'
                    value={values.fechaNacimiento}
                    onChange={handleChange}
                  />
                  {errors.fechaNacimiento && <p>{errors.fechaNacimiento}</p>}
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
