import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
const Pasajero = (props) => {
  return (
    <div className='mt-2'>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <h6> Cantidad de pasajes: {props.item.cantidadPasajes}</h6>
            </Col>
            <Col>
              <h6>Precio Total: {props.item.precioTotal}</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              {' '}
              <h6>
                Comprador: {props.item.usuario.apellido},
                {props.item.usuario.nombre}
              </h6>
            </Col>
            <Col>Estado :{props.item.estado}</Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Pasajero;
