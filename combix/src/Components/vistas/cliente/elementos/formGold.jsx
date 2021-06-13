import React, {useState} from 'react';
import {Col, Row, Form, Modal, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {activarGold} from '../../../../Redux/combixDucks';

const FormGold = (props) => {
  const [name, setName] = useState('')

  const dispatch = useDispatch();

  const usuario = useSelector((store) => store.combix.sesion);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault()
    setShow(true)
  }

  const handleNameChange = ({ target }) => {
    setName(target.value.toUpperCase())
  }

  return (
    <>
    <Form onSubmit={handleShow}>
      {' '}
      <Form.Group>
        <Form.Label>Nombre completo:</Form.Label>
        <Form.Control required value={name} placeholder='Nombre completo' onChange={handleNameChange}></Form.Control>
      </Form.Group>
      <Row>
        <Col lg={8}>
          <Form.Group>
            <Form.Label>Numero de Tarjeta:</Form.Label>
            <Form.Control
              minLength='16'
              maxLength='16'
              required
              placeholder='Numero de Tarjeta'
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>CVC:</Form.Label>
            <Form.Control
              minLength='3'
              maxLength='3'
              required
              placeholder='CVC'
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              required
              placeholder='Telefono'
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Fecha de vencimiento:</Form.Label>
            <Form.Control required type='date'></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <button className={'btn btn-login mt-4'} type='submit'>
            Activar Membresía GOLD
          </button>
        </Col>
      </Row>
    </Form>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>¡Atención!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Se registrará el pago de $475.66 por la subscripcion. ¿Desea continuar?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={() => handleClose()}>
          Cerrar
        </Button>
        <Button
          variant='danger'
          onClick={() => {
            dispatch(activarGold(
              usuario._id,
            ));
            handleClose();
          }}
        >
          Si, quiero ser GOLD
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default FormGold;
