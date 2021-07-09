import React, {useEffect, useState} from 'react';
import {Row, Col, Table, Button, Card, Accordion} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import 'bootstrap/js/src/collapse.js';
import {actualizarDisponibilidad} from '../../../Redux/choferDucks';
import {cargarPasajesViajeSeleccionado} from '../../../Redux/choferDucks';
import {completarTest} from '../../../Redux/choferDucks';
import {seleccionarUnPasajero} from '../../../Redux/choferDucks';
const ListaDePasajeros = (props) => {
  const [cantDispo, modificarDisponibilidad] = useState(
    props.item.ruta.combi.cantidadAsientos
  );
  const dispatch = useDispatch();
  const viajeSeleccionado = useSelector((state) => state.chofer.seleccionado);

  useEffect(() => {
    modificarDisponibilidad(
      cantDispo - calcularDisponibilidad(props.pasajeros)
    );
    dispatch(cargarPasajesViajeSeleccionado(viajeSeleccionado._id));
  }, []);
  function calcularDisponibilidad(pasajeros) {
    let totalPasajes = 0;
    pasajeros.forEach((e) => {
      totalPasajes = totalPasajes + e.cantidadPasajes;
    });
    dispatch(actualizarDisponibilidad(cantDispo - totalPasajes));
    return totalPasajes;
  }

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
  const pasajesChofer = useSelector(
    (state) => state.chofer.pasajesSeleccionado
  );

  return (
    <Row style={{margin: '10px 10px', maxWidth: '95vw'}}>
      <Col className={'container'}>
        <Row className={'viajes-admin'}>
          <Col>
            <Row>
              <h5 style={{color: '#357185', padding: '5px 10px'}}>
                <u>Pasajeros</u>
              </h5>
            </Row>
            <Row style={{margin: '10px 10px'}}>
              <Table striped bordered size='sm'>
                <thead>
                  <tr>
                    <th>Disponibles</th>
                    <th>{cantDispo}</th>
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
                                  style={{color: 'red'}}
                                  aria-hidden='true'
                                ></i>
                              ) : e.estado === 'aceptado' ? (
                                <i
                                  class='fa fa-check'
                                  style={{color: 'green'}}
                                  aria-hidden='true'
                                ></i>
                              ) : (
                                <i
                                  class='fa fa-question'
                                  style={{color: 'grey'}}
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
                                    style={{padding: '10px 0 0 10px'}}
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
                                  {viajeSeleccionado.estado === "abierto" && e.estado === 'pendiente' && (
                                    <Row>
                                      <Button
                                        variant='success'
                                        style={{margin: '5px', width: '100%'}}
                                        onClick={() =>
                                          dispatch(seleccionarUnPasajero(e))
                                        }
                                      >
                                        <Link
                                          to='./covid'
                                          style={{color: 'white'}}
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
                                                viajeSeleccionado._id
                                              )
                                            );
                                          }, 2000);
                                        }}
                                        style={{margin: '5px', width: '100%'}}
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
                                        {e.insumos.map((i) => (
                                          <p>{i.nombre}</p>
                                        ))}
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
        <Row>
          {viajeSeleccionado.estado === "abierto" && cantDispo > 0 && (
            <Button variant='success' style={{margin: '10px 0', width: '100%'}}>
              <Link
                to='/chofer/viaje/comprarPasajeChofer'
                style={{color: 'white'}}
              >
                Agregar Pasajero
              </Link>
            </Button>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default ListaDePasajeros;
