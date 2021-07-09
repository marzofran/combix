import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const MensajeCompraExitosa = () => {
  const compra = useSelector(
    (state) => state.chofer.pasajeChequeoCovid.precioTotal
  );
  return (
    <div className='mt-3'>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <h4>Confirmo que recíbí el monto de</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2 className='text-center'>${compra}</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                Como pago. Se enviará al E-mail del usuario los detalles del
                pasaje y de la compra.
              </Col>
            </Row>
            <Row>
              <Col>Los pasajeros ya pueden subir a la combi</Col>
            </Row>
          </Card.Body>
        </Card>
        <div className='mt-3'>
          <Row>
            <Col>
              <Button variant='success' size='lg' block>
                <Link to='/chofer/viaje/pasajeros'>
                  <h4 className={'text-white'}>Finalizar Compra</h4>
                </Link>
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default MensajeCompraExitosa;
