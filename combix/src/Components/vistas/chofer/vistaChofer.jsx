import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Router, Link, Switch, Route} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import history from '../../history';
import HistorialDeViajes from './historialDeViajes';
import {cargarViajes} from '../../../Redux/choferDucks';
import ViajesPendientes from './viajesPendientes'
import ViajeEnCurso from './elementos/viajeEnCurso';

const {toTitleCase} = require('../../../scripts/toTitleCase');

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
          <h2 style={{color: 'white', fontSize: '40px'}} className={'pt-3 pb-3'}>
            Bienvenido, {toTitleCase(chofer.nombre)}
          </h2>
          <div>
            {viajes.enCurso.length > 0 &&
              viajes.enCurso.map((e) => (
                <>
                En Curso:
                <h2>{<ViajeEnCurso item={e}></ViajeEnCurso>}</h2>
                </>
              ))}
          </div>
          <Switch>
            <Route path='/chofer/viajesPendientes'>
              <ViajesPendientes viajes={viajes.pendientes}></ViajesPendientes>
            </Route>
            <Route path='/chofer/historial'>
              <HistorialDeViajes viajes={viajes.finalizado}></HistorialDeViajes>
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
