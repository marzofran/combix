import React, {useEffect} from 'react';
import {Row, Col, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {seleccionarViaje} from '../../../../Redux/choferDucks';
import { cargarPasajesViajeSeleccionado } from '../../../../Redux/choferDucks';

const {dateFormat} = require('../../../../scripts/dateFormat')

const ViajeElemento = (props) => {

  const dispatch = useDispatch();
  const pasajeros = useSelector((store) => store.chofer.pasajesSeleccionado);
  useEffect(() => {
    dispatch(cargarPasajesViajeSeleccionado(props.item._id));
  }, []);

  console.log(pasajeros)

  return (
    <Row className={'viajes-admin'}>
      <Col>
        <Row>
          <h5 style={{color: '#357185', padding: '0 5px'}}>Origen: {props.item.ruta.origen.lugar}, {props.item.ruta.origen.provincia}</h5>
          <h5 style={{color: '#357185', padding: '0 5px'}}>Destino: {props.item.ruta.destino.lugar}, {props.item.ruta.destino.provincia}</h5>
        </Row>
        <Row>
          <Col>
            <h5 style={{color: '#357185', padding: '5px 0'}}> <i class='fa fa-calendar' aria-hidden='true'></i> {dateFormat(props.item.fecha)}</h5>
          </Col>
          <Col>
            <h5 style={{color: '#357185', padding: '5px 0'}}> <i class='fa fa-clock-o' aria-hidden='true'></i> {props.item.ruta.horario}</h5>
          </Col>
        </Row>
        <Row>
          {props.item.estado == 'pendiente' ? (
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Pendientes</th>
                  <th>Disponibles</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>nº pendientes</td>
                  <td>disponibilidad</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Abordados</th>
                  <th>Cancelados</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>nº pasajeros</td>
                  <td>nº cancelados</td>
                </tr>
              </tbody>
            </Table>
          )}     
        </Row>
        <Row>
          <Col style={{ textAlign: 'center', padding: '15px 0'}}>
            {(props.item.estado == 'finalizado' || props.item.estado == 'cancelado') && 
              <h6>Estado: {props.item.estado}</h6>
            }
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
  );
};

export default ViajeElemento;
