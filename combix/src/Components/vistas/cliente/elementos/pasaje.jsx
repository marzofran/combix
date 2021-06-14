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
import {useDispatch, useSelector} from 'react-redux';
import {cancelarPasaje} from '../../../../Redux/clienteDucks';
const {dateFormatPretty} = require('../../../../scripts/dateFormat');
const {toTitleCase} = require('../../../../scripts/toTitleCase');

const Pasaje = (props) => {
  const [show, setShow] = useState(false);
  const [texto, setTexto] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const sesion = useSelector((store) => store.combix.sesion);

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
      setTexto('Se le reintegrara el 50%');
    }
  }, []);

  function eliminarPasaje() {
    dispatch(cancelarPasaje(props.item._id, sesion._id));
    handleClose();
  }
  return (
    <Accordion className='row db-element'>
      <Card className='col'>
        <Accordion.Toggle as={Card.Body} eventKey='0'>
          <Row>
            <Col className='field-admin'>
              <label className='field-label'>Fecha</label>
              <h6 className='field-display'>
                {dateFormatPretty(props.item.viaje.fecha)}
              </h6>
            </Col>
            <Col className='field-admin'>
              <label className='field-label'>Hora</label>
              <h6 className='field-display'>
                {props.item.viaje.ruta.horario}
              </h6>
            </Col>
          </Row>
          <Row>
            <Col className='field-admin'>
              <label className='field-label' style={{width: '100%'}}>Cantidad de asientos</label>
              <h6 className='field-display'>
                {props.item.cantidadPasajes}
              </h6>
            </Col>
            <Col className='field-admin'>
              <label className='field-label' style={{width: '50%'}}>Precio Total</label>
              <h6 className='field-display'>
                ${parseFloat(props.item.precioTotal).toFixed(2)}
              </h6>
            </Col>
          </Row>
        </Accordion.Toggle>
        <Row>
          <Col lg={9}></Col>
          <Col>
            <Button onClick={handleShow} style={{marginBottom: '10px'}}>
              Reembolsar
            </Button>
          </Col>
        </Row>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <Row>
              <Col className='field-admin'>
                <label className='field-label'>Origen</label>
                <h6 className='field-display'>
                  {toTitleCase(props.item.viaje.ruta.origen.lugar)},{' '}
                  {toTitleCase(props.item.viaje.ruta.origen.provincia)}
                </h6>
              </Col>
              <Col className='field-admin'>
                <label className='field-label'>Destino</label>
                <h6 className='field-display'>
                  {toTitleCase(props.item.viaje.ruta.destino.lugar)},{' '}
                  {toTitleCase(props.item.viaje.ruta.destino.provincia)}
                </h6>
              </Col>
            </Row>
            {props.item.insumos.length > 0 && 
              <label className='field-label'>Insumos</label>}
              <div className='field-display' style={{marginBottom: '10px'}}>
                {props.item.insumos.map((item) => (
                  <p> {item.nombre}</p>
                ))}
              </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
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
    </Accordion>
  );
};

export default Pasaje;
