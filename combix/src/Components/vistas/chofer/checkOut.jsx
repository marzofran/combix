import React from 'react';
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
const CheckOut = () => {
  return (
    <div>
      <Container>
        <Form>
          <Row>
            <Col>Cantidad de asientos y monto</Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>Cantidad de asientos</Col>
                    <Col>
                      <Form.Control type='number' required></Form.Control>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Precio por pasaje</Col>
                    <Col>placeholder</Col>
                  </Row>
                  <Row>
                    <Col>Numero de asientos</Col>
                    <Col>placeHolder</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>Total</Col>
                    <Col>placeHolder</Col>
                  </Row>
                  <Row>
                    <Col>Descuento Gold</Col>
                    <Col>-placeHolder</Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>Precio final</h4>
                    </Col>
                    <Col>
                      <h4>placeHlolder</h4>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button>SIGUIENTE</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button>Cancelar compra</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CheckOut;
