import React, {useEffect} from 'react';
import {Router, Link, Switch, Route} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import history from '../../history';
import DetallesDeViaje from './detallesDeViaje';
import ListaDePasajeros from './listaDePasajeros';
import {useSelector} from 'react-redux';
import CuestionarioCovid from './elementos/cuestionarioCovid';
import CuestionariosCovidPasaje from './cuestionariosCovidPasaje';
const VistaDetalle = (props) => {
  const data = useSelector((store) => store.chofer.seleccionado);

  return (
    <div style={{backgroundColor: '#71b3ff', minHeight: '100vh'}}>
      <Router history={history}>
        <Navbar>
          <Link
            className='navbar-brand nav-link '
            to='/chofer/vistaDetalle/detalles'
          >
            <h5>Detalles</h5>
          </Link>
          <Link
            className='navbar-brand nav-link '
            to='/chofer/vistaDetalle/detalles/pasajeros'
          >
            <h5>Pasajeros</h5>
          </Link>
          <Link
            className='navbar-brand nav-link '
            to='/chofer/vistaDetalle/detalles/cuestionarioCovid'
          >
            <h5>CuestionarioCovid</h5>
          </Link>
        </Navbar>
        <Switch>
          <Route path='/chofer/vistaDetalle/detalles/cuestionarioCovid'>
            <CuestionariosCovidPasaje></CuestionariosCovidPasaje>
          </Route>
          <Route path='/chofer/vistaDetalle/detalles/pasajeros'>
            <ListaDePasajeros item={data}></ListaDePasajeros>
          </Route>
          <Route path='/chofer/vistaDetalle/detalles'>
            <DetallesDeViaje item={data}></DetallesDeViaje>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default VistaDetalle;
