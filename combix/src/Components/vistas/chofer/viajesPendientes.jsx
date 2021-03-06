import React from 'react';
import {Row, Col} from 'react-bootstrap';
import ViajeElemento from './elementos/viaje';
import HeaderListas from './elementos/headerListas';

const ViajesPendientes = (props) => {

  const viajes = props.viajes.pendientes
  
  return (
    <Row style={{margin: '0 0 0 10px', maxWidth: '90vw'}}>
      <Col className={'container'} style={{margin: '0 10px', maxWidth: '95vw'}}>
        <HeaderListas viaje={props.enCurso}></HeaderListas>
        <Row className={'viajes-admin'} style={{backgroundColor: 'lightgray'}}>
          <div className='col-9'>
              <h5 style={{color: '#357185', padding: '5px 10px'}}><u>Viajes Pendientes</u></h5>
          </div>
          <Col>
            {viajes.length > 0 &&
            viajes.map((e) => (
              <ViajeElemento item={e}></ViajeElemento>
            ))}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ViajesPendientes;
