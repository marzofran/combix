import React, {useState, useEffect} from 'react';
import {
  Card,
  Container,
  Accordion,
  Button,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {cancelarPasaje} from '../../../../Redux/clienteDucks';
const {dateFormatPretty} = require('../../../../scripts/dateFormat');

const Pasaje = (props) => {
  const [show, setShow] = useState(false);
  const [texto, setTexto] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let today = new Date();
    let fechaViaje = Date.parse(props.item.viaje.fecha);
    fechaViaje = fechaViaje / 1000 / 3600;
    today = today.getTime() / 1000 / 3600;

    let horaViaje = props.item.viaje.ruta.horario;
    horaViaje = horaViaje.split(':', 2);
    horaViaje = parseInt(horaViaje[0]) + parseFloat(horaViaje[1] / 60);
    fechaViaje = fechaViaje + horaViaje;

    if (fechaViaje > today + 48) {
      setTexto('Se le reintegrara el 100%');
    } else {
      setTexto('Se le reintegrara el 40%');
    }
  }, []);

  function eliminarPasaje() {
    dispatch(cancelarPasaje(props.item._id));
    handleClose();
  }
  return (
    <div className='mt-3'>
      <Container>
        <Card>
          <Card.Body>
            <div>
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                    <Row>
                      <Col>
                        <h4>
                          Fecha: {dateFormatPretty(props.item.viaje.fecha)}
                          {' - '}
                        </h4>
                      </Col>
                      <Col>
                        <h4>Hora: {props.item.viaje.ruta.horario}</h4>
                      </Col>
                    </Row>
                    <h4>
                      Precio Total: $
                      {parseFloat(props.item.precioTotal).toFixed(2)}
                    </h4>
                  </Accordion.Toggle>
                  <Button onClick={handleShow}>Rembolsar</Button>

                  <Accordion.Collapse eventKey='0'>
                    <Card.Body>
                      <Row>
                        <Col>
                          <h4>
                            Origen: {props.item.viaje.ruta.origen.lugar},{' '}
                            {props.item.viaje.ruta.origen.provincia}
                          </h4>
                        </Col>
                        <Col>
                          <h4>
                            Destino: {props.item.viaje.ruta.destino.lugar},{' '}
                            {props.item.viaje.ruta.destino.provincia}
                          </h4>
                        </Col>
                      </Row>
                      {props.item.insumos.length > 0 && <h4>Insumos:</h4>}

                      {props.item.insumos.map((item) => (
                        <p> {item.nombre}</p>
                      ))}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            ¿Esta seguro que desea pedir una devolución de este pasaje?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{texto}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant='danger' onClick={() => eliminarPasaje()}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pasaje;
