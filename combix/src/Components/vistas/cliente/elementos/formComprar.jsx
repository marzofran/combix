import React, {useState} from 'react';
import {Col, Row, Card, Form, Modal, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {crearPasaje} from '../../../../Redux/clienteDucks';

const FormComprar = (props) => {
  /*
  console.log(props.total);
  console.log(props.insumos);
  console.log(props.cantAsientos);
  */

  const [show, setShow] = useState(false);
  const [name, setName] = useState('')
  const [fecha, setFecha] = useState('mm/aa')

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault()
    if(noVencida(fecha)){
      setShow(true)
    } else {
      alert("La tarjeta se encuentra vencida o no es una fecha valida")
    }
  }

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

  const handleChangeFecha = ({target}) => {
    setFecha(target.value)
  }

  return (
    <div className='sombra-buscar'>
      <Card>
        <Row>
          <Col>
            <Card.Body>
              <Form onSubmit={handleShow}>
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
                      <Form.Control 
                        required 
                        value={fecha}
                        pattern='\d{2}/\d{2}' 
                        onChange={handleChangeFecha}>
                      </Form.Control>
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
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>¡Atención!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>Se registrará el pago del precio total por la compra. ¿Desea continuar?</p>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant='secondary' onClick={() => handleClose()}>
                    Cerrar
                  </Button>
                  <Button
                    variant='success'
                    onClick={handlerSubmit}
                  >
                    Comprar
                  </Button>
                </Modal.Footer>
              </Modal>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default FormComprar;

const noVencida = (fecha) => {
  let [m, y] = fecha.split('/')
  let today = new Date()
  let month = parseInt(m), year = parseInt(y)
  if (m > 12) return false
  else if ( month > today.getMonth()+1 && year >= parseInt(today.getFullYear().toString().substr(-2)) ){
    return true
  }
  return false
}