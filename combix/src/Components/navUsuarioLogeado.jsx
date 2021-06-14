import React from 'react';
import {Link, Route, Switch, Router} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import combixLogo from '../resources/CombixWhite.png';
import {cerrarSesion} from '../Redux/combixDucks';
import history from './history';
import BuscarPasajes from './vistas/cliente/buscarPasajes';

import MiPerfil from './vistas/cliente/miPerfil';
import Resultado from './vistas/cliente/resultadoBusqueda';
import ComprarComponent from './vistas/cliente/comprar';
import CompraExitosa from './vistas/cliente/elementos/compraExitosa';
const NavUsuarioLogeado = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Router history={history}>
        <Navbar expand='lg' variant='dark' style={{backgroundColor: '#135671'}}>
          <Link to='/client/buscarPasajes'>
            <Navbar.Brand>
              <img
                src={combixLogo}
                width='15%'
                className='d-inline-block align-top ml-5'
                alt='Combix logo'
              />
            </Navbar.Brand>
          </Link>

          <Link
            className='navbar-brand nav-link '
            to='/client/miPerfil/misDatos'
          >
            <h5>Mi perfil</h5>
          </Link>
          <Link
            className='navbar-brand nav-link '
            to='/client/miPerfil/misReviews'
          >
            <h5>Mis reviews</h5>
          </Link>
          <Link
            className='navbar-brand nav-link '
            to='/client/miPerfil/misPasajes'
          >
            <h5>Mis pasajes</h5>
          </Link>
          <Link className='navbar-brand nav-link ' to='/client/buscarPasajes'>
            <h5>Buscar viajes</h5>
          </Link>
          <Link
            className='navbar-brand nav-link btn mr-5'
            onClick={() => dispatch(cerrarSesion())}
            to='/login'
            style={{backgroundColor: 'red'}}
          >
            <h5> Cerrar sesion</h5>
          </Link>
        </Navbar>
        <Switch>
          <Route path='/client/buscarPasajes'>
            <BuscarPasajes></BuscarPasajes>
          </Route>

          <Route path='/client/miPerfil'>
            <MiPerfil></MiPerfil>
          </Route>

          <Route path='/client/comprar'>
            <ComprarComponent></ComprarComponent>
          </Route>
          <Route path='/client/compraExitosa'>
            <CompraExitosa></CompraExitosa>
          </Route>
          <Route path='/client/resultado'>
            <Resultado></Resultado>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default NavUsuarioLogeado;
