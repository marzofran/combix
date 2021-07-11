import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ViajeEnCurso from './viajeEnCurso';

const { toTitleCase } = require('../../../../scripts/toTitleCase');

const HeaderListas = (props) => {
  const chofer = useSelector((store) => store.combix.sesion);
  const enCurso = props.viaje

  return (
    <>
      <Row>
        <h3
          style={{ color: 'white', fontSize: '30px' }}
          className={'pt-3 pb-3'}
        >
          Bienvenido, {toTitleCase(chofer.nombre)}
        </h3>
      </Row>
      {!(Object.keys(enCurso).length === 0 && enCurso.constructor === Object) && 
        <Row>
          <Col>
              <ViajeEnCurso item={enCurso}></ViajeEnCurso>
          </Col>
        </Row>  
      }
    </>
  );
};

export default HeaderListas;
