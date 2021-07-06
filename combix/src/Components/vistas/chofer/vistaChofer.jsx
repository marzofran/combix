import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Router, Link, Switch, Route} from 'react-router-dom';
import {Navbar, Row, Col} from 'react-bootstrap';
import history from '../../history';
import HistorialDeViajes from './historialDeViajes';
import {cargarViajesChofer} from '../../../Redux/choferDucks';
import ViajesPendientes from './viajesPendientes';
import CheckOut from './checkOut';
const VistaChofer = (props) => {
  const chofer = useSelector((store) => store.combix.sesion);
  const dispatch = useDispatch();

  const viajes = useSelector((store) => store.chofer.elementos);
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
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      {chofer.permissions == '6094d50128e541353c8cf122' ? (
        <Router history={history}>
          <Navbar>
            <Row>
              <Col>
                <Link
                  className='navbar-brand nav-link '
                  to='/chofer/vistaChofer/pendientes'
                >
                  <h6>Viajes Pendientes</h6>
                </Link>
              </Col>
              <Col>
                <Link
                  className='navbar-brand nav-link '
                  to='/chofer/vistaChofer/historial'
                >
                  <h6>Historial de Viajes</h6>
                </Link>
              </Col>
            </Row>
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
