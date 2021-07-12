import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Modal, Button } from 'react-bootstrap';
import Pasajero from './pasajero';
const { dateFormat } = require('../../../../scripts/dateFormat');

const Estadistica = (props) => {
  const [recaudacion, editRecaudacion] = useState(0);
  const [cantViajeros, editCantViajeros] = useState(0);
  const [cantCancelados, editCantCancelados] = useState(0);
  const [cantAusentes, editCantAusentes] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    props.item.pasajeros.forEach((e) => {
      editRecaudacion(recaudacion + parseFloat(e.precioTotal));
      switch (e.estado) {
        case 'aceptado':
          editCantViajeros(cantViajeros + 1);
          break;
        case 'cancelado':
          editCantCancelados(cantCancelados + 1);
          break;
        case 'ausente':
          editCantAusentes(cantAusentes + 1);
          break;
        default:
          console.log(e.estado);
          break;
      }
    });
  }, []);
  return (
    <div className={'mt-2'}>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <h2>Ruta:</h2>
                </Col>
                <Col>
                  <h2>Fecha:{dateFormat(props.item.fecha, 'dd/mm/yyyy')}</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>Origen: {props.item.ruta.origen.provincia}</h4>
                </Col>
                <Col>
                  {' '}
                  <h4>Destino: {props.item.ruta.origen.provincia}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>
                    Chofer: {props.item.ruta.combi.chofer.apellido},{' '}
                    {props.item.ruta.combi.chofer.nombre}
                  </h4>
                </Col>
                <Col>
                  <h4>
                    Combi: {props.item.ruta.combi.patente},{' '}
                    {props.item.ruta.combi.modelo}
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col>Recaudacion: ${recaudacion}</Col>
                <Col>Viajeros: {cantViajeros}</Col>
                <Col>Cancelados: {cantCancelados}</Col>
                <Col>Ausentes: {cantAusentes}</Col>
              </Row>
              {props.item.pasajeros.length > 0 && (
                <Button variant='primary' onClick={handleShow}>
                  Ver Detalles
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Informacion sobre pasajes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.item.pasajeros.length > 0 &&
            props.item.pasajeros.map((item) => (
              <Pasajero item={item}></Pasajero>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Estadistica;
