import React from 'react';
import {Form, Card, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import userRegisterForm from '../userRegisterForm'

const Register = () => {
  const {handleChange, values, handleSubmit, errors} = userRegisterForm();

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
              <Form.Control type='name' placeholder='Nombre/s' name='nombre' value={values.nombre} onChange={handleChange}/>
              {errors.nombre && <p>{errors.nombre}</p>}
            </Form.Group>
            <Form.Group controlId='apellido'>
              <Form.Label>Apellido/s </Form.Label>
              <Form.Control type='name' placeholder='Apellido/s' name='apellido' value={values.apellido} onChange={handleChange}/>
              {errors.apellido && <p>{errors.apellido}</p>}
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId='dni'>
                  <Form.Label>Dni</Form.Label>
                  <Form.Control type='text' placeholder='Dni' name='DNI' value={values.DNI} onChange={handleChange}/>
                  {errors.DNI && <p>{errors.DNI}</p>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='nacimiento'>
                  <Form.Label>Fecha de nacimiento</Form.Label>
                  <Form.Control type='date' placeholder='Fecha de nacimiento' name='fecha' value={values.fecha} onChange={handleChange}/>
                  {errors.fecha && <p>{errors.fecha}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Email' name='email' value={values.email} onChange={handleChange}/>
              {errors.email && <p>{errors.email}</p>}
            </Form.Group>
            <Form.Group controlId='contraseña'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type='password' placeholder='**********' name='contrasena' value={values.contrasena} onChange={handleChange}/>
              {errors.contrasena && <p>{errors.contrasena}</p>}
            </Form.Group>
            <Form.Group controlId='contraseñaRepeat'>
              <Form.Label>Repetir contraseña</Form.Label>
              <Form.Control type='password' placeholder='**********' name='repetirContrasena' value={values.repetirContrasena} onChange={handleChange}/>
              {errors.repetirContrasena && <p>{errors.repetirContrasena}</p>}
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
