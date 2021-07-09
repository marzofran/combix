import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logearUsuario } from '../../../Redux/choferDucks';
import { Link } from 'react-router-dom';

const ComprarPasajeChofer = () => {
  const dispatch = useDispatch();
  const [mail, editMail] = useState(' ');
  const [dni, editDni] = useState(' ');
  const handleChangeEmail = (e) => {
    editMail(e.target.value);
  };
  const handleChangeDni = (e) => {
    editDni(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logearUsuario(mail, dni));
  };

  return (
    <div className='mt-2'>
      <Container>
        <Row>
          <Col>
            <h4>Usuario existente</h4>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <h4>Ingrese el E-mail del usuario</h4>

                  <Form.Group>
                    <Form.Control
                      required
                      type='email'
                      onChange={handleChangeEmail}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <h4>Ingrese el Dni del usuario</h4>
                    <Form.Control
                      required
                      type='number'
                      pattern='[0-9]{10}'
                      onChange={handleChangeDni}
                    ></Form.Control>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className='mt-2'>
            <Row>
              <Col>
                <Button variant='success' size='lg' block type='submit'>
                  Siguiente
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
        <div className='mt-2'>
          <Row>
            <Col>
              <Link to='/chofer/register'>
                {' '}
                <Button size='lg' block>
                  Registrar usuario{' '}
                </Button>
              </Link>{' '}
            </Col>
          </Row>
        </div>
        <div className='mt-2'>
          <Row>
            <Col>
              <Link to='/chofer/viaje/pasajeros'>
                <Button variant='danger' size='lg' block>
                  Cancelar compra
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ComprarPasajeChofer;
