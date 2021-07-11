import React from 'react';
import {Row, Col, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {seleccionarViaje} from '../../../../Redux/choferDucks';
import { toTitleCase } from '../../../../scripts/toTitleCase';

const ViajeEnCurso = (props) => {

  const dispatch = useDispatch();
  
  return (
    <Row style={{maxWidth: '95vw'}}>
      <Col className={'container'} style={{marginBottom: '10px'}}>
        <Row className={'viajes-admin'}>
          <Col>
            <Row>
              <Col lg={6}>
                <h5 style={{color: '#357185', padding: '5px 10px'}}><u>Viaje En Curso</u></h5>
              </Col>
              <Col>
                <h6>Hoy: <i class='fa fa-clock-o' aria-hidden='true'></i> {props.item.ruta.horario}</h6>
              </Col>
            </Row>
            <Row>
              <h6 style={{color: '#357185', padding: '0 5px'}}>{toTitleCase(props.item.ruta.origen.lugar)}, {toTitleCase(props.item.ruta.origen.provincia)} {'->'} {toTitleCase(props.item.ruta.destino.lugar)}, {toTitleCase(props.item.ruta.destino.provincia)}</h6>
            </Row>
            <Row>
              <h5>Estado: {toTitleCase(props.item.estado) }</h5>
            </Row>
            <Row>
              <Col style={{ textAlign: 'center', padding: '15px 0'}}>
                
              </Col>
              <Col>
                <Link>
                  <button
                    onClick={() => dispatch(seleccionarViaje(props.item))}
                      className={'btn btn-login'}
                      style={{ maxWidth: '30vw', float: 'right'}}
                  > 
                    Ver Más
                  </button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ViajeEnCurso;
