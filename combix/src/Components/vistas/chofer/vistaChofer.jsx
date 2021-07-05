import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Router, Link, Switch, Route} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import history from '../../history';
import HistorialDeViajes from './historialDeViajes';
import {cargarViajes} from '../../../Redux/choferDucks';
import ViajesPendientes from './viajesPendientes'

const VistaChofer = (props) => {

  const chofer = useSelector((store) => store.combix.sesion);
  const dispatch = useDispatch();

  const viajes = useSelector((store) => store.chofer.elementos);
  useEffect(() => {
    dispatch(cargarViajes(chofer._id));
  }, []);

  function redireccionar() {
    history.push('/');
    alert('no tienes permisos');
  }

  return (
    <div style={{backgroundColor: '#71b3ff', minHeight: '100vh'}}>
      {props.permisions === '6094d50128e541353c8cf122' ? (
        <Router history={history}>
          <Navbar>
            <Link className='navbar-brand nav-link ' to='/chofer/viajesPendientes'>
              <h5>Viajes Pendientes</h5>
            </Link>
            <Link className='navbar-brand nav-link ' to='/chofer/historial'>
              <h5>Historial de Viajes</h5>
            </Link>
          </Navbar>
          <Switch>
            <Route path='/chofer/viajesPendientes'>
              <ViajesPendientes viajes={viajes}></ViajesPendientes>
            </Route>
            <Route path='/chofer/historial'>
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
