import React, {useState} from 'react';
import {Container, Col, Row, Button} from 'react-bootstrap';
import CuestionarioCovid from './elementos/cuestionarioCovid';

const CuestionariosCovidPasaje = (props) => {
  const [cantidadRealizada, editarCantidadRealizada] = useState(1);
  function sumar() {
    editarCantidadRealizada(cantidadRealizada + 1);
  }
  return (
    <div>
      <Container>
        <Row>
          <Col xs={8}>
            <h4>Nombre de usuario</h4>
          </Col>
          <Col>
            <h4>{cantidadRealizada}/12</h4>
          </Col>
        </Row>
      </Container>
      <CuestionarioCovid sumar={sumar}></CuestionarioCovid>
    </div>
  );
};

export default CuestionariosCovidPasaje;
