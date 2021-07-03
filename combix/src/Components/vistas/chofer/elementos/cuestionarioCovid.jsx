import React, {useState} from 'react';
import {Container, Card, Col, Row, Form, Button} from 'react-bootstrap';
const CuestionarioCovid = (props) => {
  const [temperatura, setTemperatura] = useState(0);
  const [cantSintomas, setCantSintomas] = useState(0);

  const onChange = (e) => {
    if (e.target.checked) {
      setCantSintomas(cantSintomas + 1);
    } else {
      setCantSintomas(cantSintomas - 1);
    }
  };
  function handleSubmit() {
    console.log(cantSintomas);
  }
  return (
    <div>
      <Container>
        <Card>
          <Card.Body>
            <div>
              <Row>
                <Col xs={4}>
                  <h5>Nombre:</h5>
                </Col>
                <Col>
                  {' '}
                  <Form.Control></Form.Control>
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <h5>Dni:</h5>
                </Col>
                <Col>
                  {' '}
                  <Form.Control></Form.Control>
                </Col>
              </Row>
            </div>
            <Form>
              <Form.Group>
                <Row>
                  <Col xs={8}>
                    <Form.Label>Ingrese la temperatura:</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control></Form.Control>
                  </Col>
                </Row>
                <p>
                  Recuerde medir con el termometro sin hacer contacto con el
                  pasajero, en la parte interior de la muñeca descubierta.
                </p>
              </Form.Group>
              <Form.Group>
                <h4>Marque la/s opcion/es correcta/s</h4>
                <p>
                  ¿Ha sentido algúno de estos sintomas en las ultima semana?
                </p>
                <div className='formCovid'>
                  <Form.Group onChange={onChange}>
                    <Row>
                      <Col xs={10}>
                        <p>Fiebre (Mayor de 37.5ºC)</p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group onChange={onChange}>
                    <Row>
                      <Col xs={10}>
                        <p>Tos</p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group onChange={onChange}>
                    <Row>
                      <Col xs={10}>
                        <p>Dolor de garganta</p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group onChange={onChange}>
                    <Row>
                      <Col xs={10}>
                        <p>Agitacion o sensacion de falta de aire</p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group onChange={onChange}>
                    <Row>
                      <Col xs={10}>
                        <p>Perdida del olfata y/o gusto</p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group onChange={onChange}>
                    <Row>
                      <Col xs={10}>
                        <p>Diarrea</p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group onChange={onChange}>
                    <Row>
                      <Col xs={10}>
                        <p>Dolor de cabeza</p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group onChange={onChange}>
                    <Row>
                      <Col xs={10}>
                        <p>Dolores musculares</p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                </div>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <Button
          onClick={() => {
            props.sumar();
            handleSubmit();
          }}
        >
          {' '}
          Siguiente
        </Button>
        <Button> Cancelar chequeo</Button>
      </Container>
    </div>
  );
};

export default CuestionarioCovid;
