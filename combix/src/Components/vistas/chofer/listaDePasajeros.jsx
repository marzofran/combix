import React, {useEffect, useState} from 'react';
import {Row, Col, Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const ListaDePasajeros = (props) => {
  const [cantDispo, modificarDisponibilidad] = useState(
    props.item.ruta.combi.cantidadAsientos
  );

  useEffect(() => {
    modificarDisponibilidad(
      cantDispo - calcularDisponibilidad(props.pasajeros)
    );
  }, []);
  function calcularDisponibilidad(pasajeros) {
    let totalPasajes = 0;
    pasajeros.forEach((e) => {
      totalPasajes = totalPasajes + e.cantidadPasajes;
    });
    return totalPasajes;
  }
  return (
    <div>
      <Col className={'viajes-admin'} style={{margin: '10px 10px', maxWidth: '95vw'}}>
        <Row>
          <h5 style={{color: '#357185', padding: '5px 10px'}}>
            <u>Pasajeros</u>
          </h5>
        </Row>
        <Row>
          <Table striped bordered size='sm'>
            <thead>
              <tr>
                <th>Disponibles</th>
                <th>nº disponibles</th>
              </tr>
            </thead>
          </Table>
        </Row>
        <Row></Row>
      </Col>
      {cantDispo > 0 && (
        <Button variant='success'>
          <Link to='/chofer/viaje/comprarPasajeChofer'>Agregar Pasajero</Link>
        </Button>
      )}
    </div>
  );
};

export default ListaDePasajeros;
