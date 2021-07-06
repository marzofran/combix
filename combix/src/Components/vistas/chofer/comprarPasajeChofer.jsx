import React, {useState} from 'react';
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {logearUsuario} from '../../../Redux/choferDucks';

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
    <Container>
      <Row>
        <Col>
          <h5>Usuario existente</h5>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h5>Ingrese el E-mail del usuario</h5>

                <Form.Group>
                  <Form.Control
                    required
                    type='email'
                    onChange={handleChangeEmail}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <h5>Ingrese el Dni del usuario</h5>
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
        <Row>
          <Col>
            <Button type='submit'>Siguiente</Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col>
          <Button>Registrar usuario</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button>Cancelar compra</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ComprarPasajeChofer;
