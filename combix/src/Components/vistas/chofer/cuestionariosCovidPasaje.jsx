import React, {useState, useEffect} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import CuestionarioCovid from './elementos/cuestionarioCovid';

const CuestionariosCovidPasaje = (props) => {
  //Cambiar las constantes por las variables pasadas por props
  const usuario = {nombre: '', dni: ' '};

  const [cantidadRealizada, editarCantidadRealizada] = useState(0);
  const [usuariosConCovid, editarUsuariosConCovid] = useState([]);
  const [mensajeButton, setMensajeButton] = useState('Siguiente');
  //Actualiza el mensaje si queda solo 1 test para hacer
  useEffect(() => {
    if (cantidadRealizada >= 12) {
      setMensajeButton('Finalizar chequeo');
    }
    if (cantidadRealizada === 13) {
      if (usuariosConCovid.length > 0) {
        console.log('no paso');
      } else {
        console.log('paso el test');
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
  return (
    <div>
      <Container>
        <Row>
          <Col xs={8}>
            <h4>Usuario: </h4>
          </Col>
          <Col>
            <h4>{cantidadRealizada}/12</h4>
          </Col>
        </Row>
      </Container>
      <CuestionarioCovid
        sumar={sumar}
        agregar={agregar}
        mensaje={mensajeButton}
      ></CuestionarioCovid>
    </div>
  );
};

export default CuestionariosCovidPasaje;
