import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Button, Card, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/js/src/collapse.js';
import { actualizarDisponibilidad } from '../../../Redux/choferDucks';
import { cargarPasajesViajeSeleccionado } from '../../../Redux/choferDucks';
import { completarTest } from '../../../Redux/choferDucks';
import { seleccionarUnPasajero } from '../../../Redux/choferDucks';
const ListaDePasajeros = (props) => {
  const viajeSeleccionado = useSelector((state) => state.chofer.seleccionado);
  const disponibilidad = useSelector((state) => state.chofer.disponibilidad);
  const pasajesChofer = useSelector(
    (state) => state.chofer.pasajesSeleccionado
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      cargarPasajesViajeSeleccionado(viajeSeleccionado._id, viajeSeleccionado)
    );
  }, []);

  const toggleHandler = (e) => {
    const hiddenElement = e.currentTarget.nextSibling;

    if (hiddenElement.className.indexOf('collapse show') > -1) {
      hiddenElement.classList.remove('show');
    } else {
      e.currentTarget.parentNode.childNodes.forEach((e) =>
        e.classList.remove('show')
      );
      hiddenElement.classList.add('show');
    }
  };

  return (
    <Row style={{ margin: '10px 10px', maxWidth: '95vw' }}>
      <Col className={'container'}>
        <Row className={'viajes-admin'}>
          <Col>
            <Row>
              <h5 style={{ color: '#357185', padding: '5px 10px' }}>
                <u>Pasajeros</u>
              </h5>
            </Row>
            <Row style={{ margin: '10px 10px' }}>
              <Table striped bordered size='sm'>
                <thead>
                  <tr>
                    <th>Disponibles</th>
                    <th>{disponibilidad}</th>
                  </tr>
                </thead>
              </Table>
            </Row>
            <Row>
              <Table striped bordered size='sm'>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Asientos</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pasajesChofer.length > 0 &&
                    pasajesChofer.map((e) => {
                      return (
                        <>
                          <tr onClick={toggleHandler}>
                            <td>
                              {e.usuario.apellido} {e.usuario.nombre}
                            </td>
                            <td>{e.cantidadPasajes}</td>
                            <td>
                              {e.estado === 'pendiente' ? (
                                <i
                                  class='fa fa-hourglass'
                                  aria-hidden='true'
                                ></i>
                              ) : e.estado === 'cancelado' ? (
                                <i
                                  class='fa fa-times'
                                  style={{ color: 'red' }}
                                  aria-hidden='true'
                                ></i>
                              ) : e.estado === 'aceptado' ? (
                                <i
                                  class='fa fa-check'
                                  style={{ color: 'green' }}
                                  aria-hidden='true'
                                ></i>
                              ) : (
                                <i
                                  class='fa fa-question'
                                  style={{ color: 'grey' }}
                                  aria-hidden='true'
                                ></i>
                              )}
                            </td>
                          </tr>
                          <tr className='collapse'>
                            <td colSpan='3'>
                              <Row className={'container'}>
                                <Col>
                                  <Row
                                    className={'container'}
                                    style={{ padding: '10px 0 0 10px' }}
                                  >
                                    <h5
                                      style={{
                                        color: '#357185',
                                        padding: '0 5px',
                                      }}
                                    >
                                      Chequeo:{' '}
                                      {e.estado === 'cancelado'
                                        ? 'RECHAZADO'
                                        : e.estado.toUpperCase()}
                                    </h5>
                                  </Row>
                                  {viajeSeleccionado.estado === 'abierto' &&
                                    e.estado === 'pendiente' && (
                                      <Row>
                                        <Button
                                          variant='success'
                                          style={{
                                            margin: '5px',
                                            width: '100%',
                                          }}
                                          onClick={() =>
                                            dispatch(seleccionarUnPasajero(e))
                                          }
                                        >
                                          <Link
                                            to='/chofer/covid'
                                            style={{ color: 'white' }}
                                          >
                                            Realizar Chequeo
                                          </Link>
                                        </Button>
                                        <Button
                                          variant='danger'
                                          onClick={() => {
                                            dispatch(
                                              completarTest(
                                                e._id,
                                                'ausente',
                                                false
                                              )
                                            );
                                            setTimeout(function () {
                                              dispatch(
                                                cargarPasajesViajeSeleccionado(
                                                  viajeSeleccionado._id,
                                                  viajeSeleccionado
                                                )
                                              );
                                            }, 1000);
                                          }}
                                          style={{
                                            margin: '5px',
                                            width: '100%',
                                          }}
                                        >
                                          Marcar como Ausente
                                        </Button>
                                      </Row>
                                    )}
                                  {e.insumos.length > 0 && (
                                    <div className={'container'}>
                                      <Row>
                                        <h5
                                          style={{
                                            color: '#357185',
                                            padding: '0 5px',
                                          }}
                                        >
                                          Insumos
                                        </h5>
                                      </Row>
                                      <Row
                                        className={'viajes-admin'}
                                        style={{
                                          backgroundColor: 'lightgray',
                                          margin: '0 0 10px 0',
                                        }}
                                      >
                                        <ul>{e.insumos.map((i) => (
                                          <li>{i.nombre}</li>
                                        ))}</ul>
                                      </Row>
                                    </div>
                                  )}
                                </Col>
                              </Row>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>

        {viajeSeleccionado.estado === 'abierto' && disponibilidad > 0 && (
          <div className={'mt-2'}>
            <Row>
              <Col>
                <Link to='/chofer/comprarPasajeChofer'>
                  <Button variant='success' size='lg' block>
                    Agregar Pasajero
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default ListaDePasajeros;
