import React from 'react';
import {Col, Row, Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { dateFormat } from '../../../scripts/dateFormat';
import { abrirViaje, comenzarViaje, finalizarViaje } from '../../../Redux/choferDucks';
import { toTitleCase } from '../../../scripts/toTitleCase';

const DetallesDeViaje = (props) => {
  const disponibilidad = useSelector((state) => state.chofer.disponibilidad);
  const pasajesChofer = useSelector((state) => state.chofer.pasajesSeleccionado);
  let cancelados = 0;
  let aceptados = 0;
  let pendientes = 0;
  for (const key in pasajesChofer)
    switch (pasajesChofer[key].estado) {
      case 'cancelado': cancelados++;
        break;
      case 'aceptado': aceptados++;
        break;
      case 'pendiente': pendientes++;
        break;
      default: console.log('estado de pasaje no valido');
        break;
    }
  const dispatch = useDispatch();
  return (
    <Row style={{ margin: '10px 10px', maxWidth: '95vw' }}>
      <Col className={'container'} style={{marginBottom: '10px'}}>
        <Row className={'viajes-admin'}>
          <Col>
            <Row>
              <h6 style={{color: '#357185', padding: '0 5px'}}>Origen: {toTitleCase(props.item.ruta.origen.lugar)}, {toTitleCase(props.item.ruta.origen.provincia)}</h6>
            </Row>
            <Row>
              <h6 style={{color: '#357185', padding: '0 5px'}}>Destino: {toTitleCase(props.item.ruta.destino.lugar)}, {toTitleCase(props.item.ruta.destino.provincia)}</h6>
            </Row>
            <Row>
          <Col>
            <h5 style={{ color: '#357185', padding: '5px 0' }}>
              {' '}
              <i class='fa fa-calendar' aria-hidden='true'></i>{' '}
              {dateFormat(props.item.fecha)}
            </h5>
          </Col>
          <Col>
            <h5 style={{ color: '#357185', padding: '5px 0' }}>
              {' '}
              <i class='fa fa-clock-o' aria-hidden='true'></i>{' '}
              {props.item.ruta.horario}
            </h5>
          </Col>
        </Row>
            <Row>
              <h5>Estado: {toTitleCase(props.item.estado)}</h5>
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
                    <td>{pendientes}</td>
                    <td>{aceptados}</td>
                    <td>{disponibilidad}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row>
              {props.item.estado === 'pendiente' && props.item.fecha === Date.Today ? (<Col style={{ color: 'red', textAlign: 'center', padding: '15px 0'}}>
                El viaje es hoy!
              </Col>) : props.item.estado === 'pendiente' && props.item.fecha !== Date.Today ? (<Col style={{ color: 'red', textAlign: 'center', padding: '15px 0'}}>
                Solo puede comenzar el viaje el dia indicado!
              </Col>) : props.item.estado === 'abierto' ? (<Col style={{ color: 'red', textAlign: 'center', padding: '15px 0'}}>
                El viaje puede comenzar! 
              </Col>) : <Col/>}
              <Col>
                {props.item.estado === 'pendiente' && props.item.fecha === Date.Today ? (<button
                    onClick={() => dispatch(abrirViaje(props.item._id))}
                      className={'btn btn-login'}
                      style={{ maxWidth: '30vw', float: 'right'}}
                  > 
                    Comenzar Check-in
                  </button>) : props.item.estado === 'pendiente' && props.item.fecha !== Date.Today ? (<button
                      className={'btn btn-disabled'}
                      style={{ maxWidth: '30vw', float: 'right', backgroundColor: 'grey'}}
                  > 
                    Comenzar Check-in
                  </button>) : props.item.estado === 'abierto' ? (<button //agregar condicion de pendientes 0!!!
                    onClick={() => dispatch(comenzarViaje(props.item._id))} //poner en curso
                      className={'btn btn-login'}
                      style={{ maxWidth: '30vw', float: 'right'}}
                  > 
                    Comenzar viaje
                  </button>) : props.item.estado === 'en curso' ? (<button
                    onClick={() => dispatch(finalizarViaje(props.item._id))} //cerrar viaje
                      className={'btn btn-login'}
                      style={{ maxWidth: '30vw', float: 'right'}}
                  > 
                    Finalizar Viaje
                  </button>) : (<Col/>) }
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
  };

export default DetallesDeViaje;
