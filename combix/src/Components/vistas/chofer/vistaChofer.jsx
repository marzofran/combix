import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Router, Link, Switch, Route, NavLink} from 'react-router-dom';
import {Navbar, Container, Row, Col, Nav} from 'react-bootstrap';
import history from '../../history';
import HistorialDeViajes from './historialDeViajes';
import {cargarViajesChofer} from '../../../Redux/choferDucks';
import ViajesPendientes from './viajesPendientes';
import CheckOut from './checkOut';
const VistaChofer = (props) => {
  const chofer = useSelector((store) => store.combix.sesion);
  const dispatch = useDispatch();

  const viajes = useSelector((store) => store.chofer.elementos);
  const enCurso = useSelector((store) => store.chofer.enCurso)


  useEffect(() => {
    dispatch(cargarViajesChofer(chofer._id));
  }, []);

  function redireccionar() {
    history.push('/');
    alert('no tienes permisos');
  }

  history.push('/chofer/vistaChofer/pendientes');

  return (
    <div
      style={{
        backgroundColor: '#71b3ff',
        minHeight: '100vh'
      }}
    >
      {chofer.permissions == '6094d50128e541353c8cf122' ? (
        <Router history={history}>
          <Navbar className='navBarChoferDetalles' style={{ padding: '10px 0px 0px 10px'}}>
            <Container>
              <Row>
                <Col>
                  <Nav.Link style={{ padding: '10px 0px 0px 10px'}}>
                    <NavLink
                      className='navbar-brand nav-link '
                      to='/chofer/vistaChofer/pendientes'
                      activeClassName='navActiveChoferDetalles'
                    >
                      <h6>Viajes Pendientes</h6>
                    </NavLink>
                  </Nav.Link>
                </Col>
                <Col>
                  <Nav.Link style={{ padding: '10px 0px 0px 10px'}}>
                    <NavLink
                      className='navbar-brand nav-link '
                      to='/chofer/vistaChofer/historial'
                      activeClassName='navActiveChoferDetalles'
                    >
                      <h6>Historial de Viajes</h6>
                    </NavLink>  
                  </Nav.Link>
                </Col>
              </Row>
            </Container>
          </Navbar>
          <Switch>
            <Route path='/chofer/vistaChofer/pendientes'>
              <ViajesPendientes viajes={viajes}></ViajesPendientes>
            </Route>
            <Route path='/chofer/vistaChofer/historial'>
              <HistorialDeViajes viajes={viajes}></HistorialDeViajes>
            </Route>
          </Switch>
        </Router>
      ) : (
        redireccionar()
      )}
    </div>
  );
};

export default VistaChofer;
