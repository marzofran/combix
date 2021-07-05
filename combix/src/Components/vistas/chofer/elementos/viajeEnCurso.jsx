import React from 'react';
import {Row, Col, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {seleccionarViaje} from '../../../../Redux/choferDucks';

const {dateFormat} = require('../../../../scripts/dateFormat')

const ViajeEnCurso = (props) => {

  const dispatch = useDispatch();

  return (
    <Col className={'viajes-admin'} style={{backgroundColor: 'lightgray'}}>
      <Row>
        <Col lg={6}>
          <h5 style={{color: '#357185', padding: '5px 10px'}}><u>Viaje En Curso</u></h5>
        </Col>
        <Col>
          <h6>Hoy: <i class='fa fa-clock-o' aria-hidden='true'></i> {props.item.ruta.horario}</h6>
        </Col>
      </Row>
      <Row>
        <h6 style={{color: '#357185', padding: '0 5px'}}>{props.item.ruta.origen.lugar}, {props.item.ruta.origen.provincia} -> {props.item.ruta.destino.lugar}, {props.item.ruta.destino.provincia}</h6>
      </Row>
      <Row>
        <h5>Estado: {props.item.estado}</h5>
      </Row>
      <Row>
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th>Pendientes</th>
              <th>Abordados</th>
              <th>Disponibles</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>nº pendientes</td>
              <td>nº abordados</td>
              <td>disponibilidad</td>
            </tr>
          </tbody>
        </Table>
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
  );
};

export default ViajeEnCurso;
