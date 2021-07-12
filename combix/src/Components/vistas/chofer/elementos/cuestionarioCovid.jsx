import React, { useState } from 'react';
import { Container, Card, Col, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const CuestionarioCovid = (props) => {
  const [temperatura, setTemperatura] = useState('');
  const [cantSintomas, setCantSintomas] = useState('');
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');

  const onChange = (e) => {
    if (e.target.checked) {
      setCantSintomas(cantSintomas + 1);
    } else {
      setCantSintomas(cantSintomas - 1);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cantSintomas >= 2 || temperatura >= 38) {
      props.agregar(nombre, dni);
    }
    props.sumar();
    clear();
  };
  const handlerNombre = (e) => {
    setNombre(e.target.value);
  };
  const handlerDni = (e) => {
    setDni(e.target.value);
  };
  const handlerTemperatura = (e) => {
    setTemperatura(e.target.value);
  };

  function clear() {
    setTemperatura('');
    setDni('');
    setNombre('');
  }
  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Card>
            <Card.Body>
              <div>
                <Row>
                  <Col xs={4}>
                    <h5>Nombre:</h5>
                  </Col>
                  <Col>
                    {' '}
                    <Form.Control
                      required
                      onChange={handlerNombre}
                      value={nombre}
                    ></Form.Control>
                  </Col>
                </Row>
                <Form.Group className='mt-2'>
                  <Row>
                    <Col xs={4}>
                      <h5>Dni:</h5>
                    </Col>
                    <Col>
                      {' '}
                      <Form.Control
                        required
                        onChange={handlerDni}
                        value={dni}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
              </div>

              <Form.Group className={'mt-2'}>
                <Row>
                  <Col xs={8}>
                    <Form.Label>Ingrese la temperatura:</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      required
                      onChange={handlerTemperatura}
                      value={temperatura}
                    ></Form.Control>
                  </Col>
                </Row>
                <p className='mt-2'>
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
                  <Form.Group
                    onChange={onChange}
                    className='pCuestionarioCovid '
                  >
                    <Row>
                      <Col xs={10}>
                        <p className='resetP'>Tos</p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                  <hr />
                  <Form.Group
                    className='pCuestionarioCovid'
                    onChange={onChange}
                  >
                    <Row>
                      <Col xs={10}>
                        <p className='resetP'>Dolor de garganta</p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                  <hr />
                  <Form.Group
                    className='pCuestionarioCovid'
                    onChange={onChange}
                  >
                    <Row>
                      <Col xs={10}>
                        <p className='resetP'>
                          Agitacion o sensacion de falta de aire
                        </p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                  <hr />
                  <Form.Group
                    className='pCuestionarioCovid'
                    onChange={onChange}
                  >
                    <Row>
                      <Col xs={10}>
                        <p className='resetP'>Perdida del olfata y/o gusto</p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                  <hr />
                  <Form.Group
                    className='pCuestionarioCovid'
                    onChange={onChange}
                  >
                    <Row>
                      <Col xs={10}>
                        <p className='resetP'>Diarrea</p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                  <hr />
                  <Form.Group
                    className='pCuestionarioCovid'
                    onChange={onChange}
                  >
                    <Row>
                      <Col xs={10}>
                        <p className='resetP'>Dolor de cabeza</p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                  <hr />
                  <Form.Group
                    className='pCuestionarioCovid'
                    onChange={onChange}
                  >
                    <Row>
                      <Col xs={10}>
                        <p className='resetP'>Dolores musculares</p>
                      </Col>
                      <Col>
                        <Form.Check />
                      </Col>
                    </Row>
                  </Form.Group>
                  <hr />
                </div>
              </Form.Group>
            </Card.Body>
          </Card>
          <Row>
            <Col>
              <Button
                style={{ width: '100%' }}
                className='mt-2'
                size='lg'
                variant='success'
                type='submit'
              >
                {' '}
                {props.mensaje}
              </Button>
            </Col>
          </Row>
          <Link to='/chofer/viaje/pasajeros'>
            <Button
              className='mt-2 mb-5'
              style={{ width: '100%' }}
              size='lg'
              variant='danger'
            >
              {' '}
              Cancelar chequeo
            </Button>
          </Link>
        </Form>
      </Container>
    </div>
  );
};

export default CuestionarioCovid;
