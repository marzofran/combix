import React, {useEffect} from 'react';
import {Router, Link, Switch, Route, NavLink} from 'react-router-dom';
import {Navbar, Container, Row, Col, Nav} from 'react-bootstrap';
import history from '../../history';
import DetallesDeViaje from './detallesDeViaje';
import ListaDePasajeros from './listaDePasajeros';
import {useSelector, useDispatch} from 'react-redux';
import {cargarPasajesViajeChofer} from '../../../Redux/choferDucks';
import CuestionariosCovidPasaje from './cuestionariosCovidPasaje';
import ComprarPasajeChofer from './comprarPasajeChofer';
import CheckOut from './checkOut';
const VistaDetalle = (props) => {
  const data = useSelector((store) => store.chofer.seleccionado);
  const pasajeros = useSelector((store) => store.chofer.pasajesSeleccionado);
  const chofer = useSelector((store) => store.combix.sesion);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cargarPasajesViajeChofer(data._id));
  }, []);
  history.push('/chofer/viaje/detalles');

  return (
    <div style={{backgroundColor: '#71b3ff', minHeight: '100vh'}}>
      <Router history={history}>
        <Navbar className='navBarChoferDetalles' style={{ padding: '10px 0px 0px 10px'}}>
          <Container>
            <Row>
              <Col>
                <Nav.Link style={{ padding: '10px 0px 0px 10px'}}>
                  <NavLink
                    className='navbar-brand nav-link '
                    to='/chofer/viaje/detalles'
                    activeClassName='navActiveChoferDetalles'
                  >
                    <h5>Detalles</h5>
                  </NavLink>
                </Nav.Link>
              </Col>

              <Col>
                <Nav.Link style={{ padding: '10px 0px 0px 10px'}}>
                  <NavLink
                    className='navbar-brand nav-link '
                    to='/chofer/viaje/pasajeros'
                    activeClassName='navActiveChoferDetalles'
                  >
                    <h5>Pasajeros</h5>
                  </NavLink>
                </Nav.Link>
              </Col>
            </Row>
          </Container>
        </Navbar>

        <Switch>
          <Route path='/chofer/viaje/checkOut'>
            <CheckOut></CheckOut>
          </Route>
          <Route path='/chofer/viaje/comprarPasajeChofer'>
            <ComprarPasajeChofer></ComprarPasajeChofer>
          </Route>
          <Route path='/chofer/viaje/covid'>
            <CuestionariosCovidPasaje></CuestionariosCovidPasaje>
          </Route>
          <Route path='/chofer/viaje/pasajeros'>
            <ListaDePasajeros
              item={data}
              pasajeros={pasajeros}
            ></ListaDePasajeros>
          </Route>
          <Route path='/chofer/viaje/detalles'>
            <DetallesDeViaje
              item={data}
              pasajeros={pasajeros}
            ></DetallesDeViaje>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default VistaDetalle;
