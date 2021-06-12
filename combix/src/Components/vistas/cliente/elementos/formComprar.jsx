import React, {useState} from 'react';
import {Col, Row, Card, Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {crearPasaje} from '../../../../Redux/clienteDucks';

const FormComprar = (props) => {
  /*
  console.log(props.total);
  console.log(props.insumos);
  console.log(props.cantAsientos);
  */

  const [name, setName] = useState('')

  const dispatch = useDispatch();
  const handlerSubmit = (event) => {
    event.preventDefault();

    dispatch(
      crearPasaje(
        props.viaje,
        props.user,
        props.cantAsientos,
        props.insumos,
        props.total
      )
    );
  };

  const handleNameChange = ({ target }) => {
    setName(target.value.toUpperCase())
  }

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
