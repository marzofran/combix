import React, {useState, useEffect} from 'react';
import {Col, Row, Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { dateFormat } from '../../../scripts/dateFormat';
import { abrirViaje, comenzarViaje, finalizarViaje } from '../../../Redux/choferDucks';
import { toTitleCase } from '../../../scripts/toTitleCase';

const DetallesDeViaje = (props) => {
  const viajeSeleccionado = useSelector((state) => state.chofer.seleccionado);
  const disponibilidad = useSelector((state) => state.chofer.disponibilidad);
  const pasajesChofer = useSelector((state) => state.chofer.pasajesSeleccionado);

  console.log(viajeSeleccionado)

  let cancelados = 0;
  let aceptados = 0;
  let pendientes = 0;
  for (const key in pasajesChofer)
    switch (pasajesChofer[key].estado) {
      case 'cancelado': cancelados += pasajesChofer[key].cantidadPasajes;
        break;
      case 'aceptado': aceptados += pasajesChofer[key].cantidadPasajes;
        break;
      case 'pendiente': pendientes += pasajesChofer[key].cantidadPasajes;
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
              <h6 style={{color: '#357185', padding: '0 5px'}}>Origen: {toTitleCase(viajeSeleccionado.ruta.origen.lugar)}, {toTitleCase(viajeSeleccionado.ruta.origen.provincia)}</h6>
            </Row>
            <Row>
              <h6 style={{color: '#357185', padding: '0 5px'}}>Destino: {toTitleCase(viajeSeleccionado.ruta.destino.lugar)}, {toTitleCase(viajeSeleccionado.ruta.destino.provincia)}</h6>
            </Row>
            <Row>
          <Col>
            <h5 style={{ color: '#357185', padding: '5px 0' }}>
              {' '}
              <i class='fa fa-calendar' aria-hidden='true'></i>{' '}
              {dateFormat(viajeSeleccionado.fecha)}
            </h5>
          </Col>
          <Col>
            <h5 style={{ color: '#357185', padding: '5px 0' }}>
              {' '}
              <i class='fa fa-clock-o' aria-hidden='true'></i>{' '}
              {viajeSeleccionado.ruta.horario}
            </h5>
          </Col>
        </Row>
            <Row>
              <h5>Estado: {toTitleCase(viajeSeleccionado.estado)}</h5>
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
              {viajeSeleccionado.estado === 'pendiente' && isToday(new Date(viajeSeleccionado.fecha)) ? (<Col style={{ color: 'red', textAlign: 'center', padding: '15px 0'}}>
                El viaje es hoy!
              </Col>) : viajeSeleccionado.estado === 'pendiente' && !isToday(new Date(viajeSeleccionado.fecha)) ? (<Col style={{ color: 'red', textAlign: 'center', padding: '15px 0'}}>
                Solo puede comenzar el viaje el dia indicado!
              </Col>) : viajeSeleccionado.estado === 'abierto' ? (<Col style={{ color: 'red', textAlign: 'center', padding: '15px 0'}}>
                El viaje puede comenzar! 
              </Col>) : <Col/>}
              <Col>
                {viajeSeleccionado.estado === 'pendiente' && isToday(new Date(viajeSeleccionado.fecha)) ? (<button
                    onClick={() => dispatch(abrirViaje(viajeSeleccionado._id))}
                      className={'btn btn-login'}
                      style={{ maxWidth: '30vw', float: 'right'}}
                  > 
                    Comenzar Check-in
                  </button>) : viajeSeleccionado.estado === 'pendiente' && !isToday(new Date(viajeSeleccionado.fecha)) ? (<button
                      className={'btn btn-disabled'}
                      style={{ maxWidth: '30vw', float: 'right', backgroundColor: 'grey'}}
                  > 
                    Comenzar Check-in
                  </button>) : viajeSeleccionado.estado === 'abierto' ? (<button //agregar condicion de pendientes 0!!!
                    onClick={() => dispatch(comenzarViaje(viajeSeleccionado._id))} //poner en curso
                      className={'btn btn-login'}
                      style={{ maxWidth: '30vw', float: 'right'}}
                  > 
                    Comenzar viaje
                  </button>) : viajeSeleccionado.estado === 'en curso' ? (<button
                    onClick={() => dispatch(finalizarViaje(viajeSeleccionado._id))} //cerrar viaje
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

const isToday = (someDate) => {
  const today = new Date()
  return someDate.getDate() + 1 == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}

export default DetallesDeViaje;
