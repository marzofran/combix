import React, {useState, useEffect} from 'react';
import {Container, Col, Row, Modal, Button} from 'react-bootstrap';
import CuestionarioCovid from './elementos/cuestionarioCovid';
import {useDispatch} from 'react-redux';
import {completarTest} from '../../../Redux/choferDucks';
const CuestionariosCovidPasaje = (props) => {
  const dispatch = useDispatch();
  //Cambiar las constantes por las variables pasadas por props
  const usuario = {nombre: '', dni: ' '};

  const [cantidadRealizada, editarCantidadRealizada] = useState(0);
  const [usuariosConCovid, editarUsuariosConCovid] = useState([]);
  const [mensajeButton, setMensajeButton] = useState('Siguiente');
  //Actualiza el mensaje si queda solo 1 test para hacer
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (cantidadRealizada > 0) {
      setMensajeButton('Finalizar chequeo');
      if (usuariosConCovid.length > 0) {
        handleShow();
      }
    }
    if (cantidadRealizada === 2) {
      //aca va la cant de asientos del viaje
      if (usuariosConCovid.length > 0) {
        handleShow();
      } else {
        completarTest('id', 'aceptado ');
      }
    }
  }, [cantidadRealizada]);
  function sumar() {
    editarCantidadRealizada(cantidadRealizada + 1);
    //console.log(usuariosConCovid);
  }
  function agregar(nombre, dni) {
    usuario.nombre = nombre;
    usuario.dni = dni;
    editarUsuariosConCovid([...usuariosConCovid, usuario]);
    //console.log(usuariosConCovid);
  }
  function cancelarPasaje() {
    dispatch(completarTest('id', 'cancelado '));
  }
  return (
    <div>
      <Container>
        <Row>
          <Col xs={8}>
            <h4>Usuario: </h4>
          </Col>
          <Col>
            <h4>{cantidadRealizada}/2</h4>
          </Col>
        </Row>
      </Container>
      <CuestionarioCovid
        sumar={sumar}
        agregar={agregar}
        mensaje={mensajeButton}
      ></CuestionarioCovid>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        centered
      >
        <Modal.Body>
          El pasajero
          {usuariosConCovid[usuariosConCovid.length - 1]?.nombre} y DNI{' '}
          {usuariosConCovid[usuariosConCovid.length - 1]?.dni} presenta sintomas
          positivos de COVID-19 y se procedera a penalizar la cuenta del usuario
          comprador, bloqueando cualquier comprador en los siguientes 15 dias y
          reembolsando todo pasaje ya comprado para ese mismo periodo. ¿Desea
          proceder?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            onClick={() => {
              handleClose();
              cancelarPasaje();
            }}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CuestionariosCovidPasaje;
