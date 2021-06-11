import React from 'react';
import {Col, Row, Card, Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {crearPasaje} from '../../../../Redux/clienteDucks';

const FormComprar = (props) => {
  /*
  console.log(props.total);
  console.log(props.insumos);
  console.log(props.cantAsientos);
  */
  const usuario = useSelector((store) => store.combix.sesion);
  const dispatch = useDispatch();
  const handlerSubmit = (event) => {
    event.preventDefault();
    console.log(usuario);
    dispatch(
      crearPasaje(
        props.viaje,
        usuario,
        props.cantAsientos,
        props.insumos,
        props.total
      )
    );
  };
  return (
    <div className='sombra-buscar'>
      <Card>
        <Row>
          <Col>
            <Card.Body>
              <Form onSubmit={handlerSubmit}>
                {' '}
                <Form.Group>
                  <Form.Label>Nombre completo:</Form.Label>
                  <Form.Control required placeholder='Nombre'></Form.Control>
                </Form.Group>
                <Row>
                  <Col lg={8}>
                    <Form.Group>
                      <Form.Label>Numero de Tarjeta:</Form.Label>
                      <Form.Control
                        required
                        placeholder='Numero de Tarjeta:'
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>CVC:</Form.Label>
                      <Form.Control required placeholder='CVC:'></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Telefono:</Form.Label>
                      <Form.Control
                        required
                        placeholder='Telefono:'
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
                  <Col lg={8}></Col>
                  <Col>
                    <button className={'btn btn-login mt-4'} type='submit'>
                      Comprar
                    </button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default FormComprar;
