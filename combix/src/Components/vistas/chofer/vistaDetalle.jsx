import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Router, Link, Switch, Route, useLocation} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import history from '../../history';
import DetallesDeViaje from './detallesDeViaje';
import ListaDePasajeros from './listaDePasajeros';

const VistaDetalle = () => {

  const chofer = useSelector((store) => store.combix.sesion);
  
  const location = useLocation();
  const dispatch = useDispatch();
  const data = location.state.viaje;

  return (
    <div style={{backgroundColor: '#71b3ff', minHeight: '100vh'}}>
        <Router history={history}>
            <Navbar>
                <Link className='navbar-brand nav-link ' to='/chofer/vistaDetalle/detalles'>
                    <h5>Detalles</h5>
                </Link>
                <Link className='navbar-brand nav-link ' to='/chofer/vistaDetalle/pasajeros'>
                    <h5>Pasajeros</h5>
                </Link>
            </Navbar>
            <Switch>
                <Route path='/chofer/vistaDetalle/detalles'>
                    <DetallesDeViaje item={data}></DetallesDeViaje>
                </Route>
                <Route path='/chofer/vistaDetalle/pasajeros'>
                    <ListaDePasajeros item={data}></ListaDePasajeros>
                </Route>
            </Switch>
        </Router>
    </div>
  );
};

export default VistaDetalle;