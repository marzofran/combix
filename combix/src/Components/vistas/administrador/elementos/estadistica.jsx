import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Modal, Button } from 'react-bootstrap';
import Pasajero from './pasajero';
const { dateFormat } = require('../../../../scripts/dateFormat');
const { toTitleCase } = require('../../../../scripts/toTitleCase');

const Estadistica = (props) => {
  const [recaudacion, editRecaudacion] = useState(0);
  const [cantViajeros, editCantViajeros] = useState(0);
  const [cantCancelados, editCantCancelados] = useState(0);
  const [cantAusentes, editCantAusentes] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    let aceptados = 0;
    let cancelados = 0;
    let ausentes = 0;
    let recaudacionTotal = 0;

    props.item.pasajeros.forEach((e) => {
      if (e.estado === 'aceptado') {
        aceptados = aceptados + parseFloat(e.cantidadPasajes);
        recaudacionTotal = recaudacionTotal + parseFloat(e.precioTotal);
      } else if (e.estado === 'cancelado') {
        cancelados = cancelados + parseFloat(e.cantidadPasajes);
      } else if (e.estado === 'ausente') {
        ausentes = ausentes + parseFloat(e.cantidadPasajes);
        recaudacionTotal = recaudacionTotal + parseFloat(e.precioTotal);
      }
    });

    editCantViajeros(aceptados);
    editCantCancelados(cancelados);
    editCantAusentes(ausentes);
    editRecaudacion(recaudacionTotal);
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
                  <h4>Origen: {toTitleCase(props.item.ruta.origen.lugar)}</h4>
                </Col>
                <Col>
                  {' '}
                  <h4>Destino: {toTitleCase(props.item.ruta.destino.lugar)}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>
                    Chofer: {toTitleCase(props.item.ruta.combi.chofer.apellido)},{' '}
                    {toTitleCase(props.item.ruta.combi.chofer.nombre)}
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
