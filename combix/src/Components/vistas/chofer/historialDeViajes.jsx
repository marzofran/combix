import React from 'react';
import {Row, Col} from 'react-bootstrap';
import ViajeElemento from './elementos/viaje';
import HeaderListas from './elementos/headerListas';

const HistorialDeViajes = (props) => {

  const viajes = props.viajes.finalizado

  return (
    <Col className='container' style={{margin: '0 10px', maxWidth: '95vw'}} >
      <HeaderListas viajes={props.viajes.enCurso}></HeaderListas>
      <Row className={'viajes-admin'} style={{backgroundColor: 'lightgray'}}>
        <div className='col-9'>
            <h5 style={{color: '#357185', padding: '5px 10px'}}><u>Historial de Viajes</u></h5>
        </div>
        <Col>
          {viajes.length > 0 &&
          viajes.map((e) => (
            <ViajeElemento item={e}></ViajeElemento>
          ))}
        </Col>
      </Row>
    </Col>
  );
};

export default HistorialDeViajes;