import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Router, Switch, Route, Link } from 'react-router-dom';
import Login from './login';
import Home from './home';
import history from './history';
import VistaAdmin from './vistas/administrador/vistaAdmin';
import combixLogo from '../resources/CombixWhite.png';
import { useSelector } from 'react-redux';
import NavChoferLogeado from './navChoferLogeado';
import NavAdminLogeado from './navAdminLogeado';
import HomeCliente from './vistas/cliente/homeCliente';
import OlvideContraseña from './olvideMiContraseña';
import VistaChofer from './vistas/chofer/vistaChofer';
import VistaDetalle from './vistas/chofer/vistaDetalle';
import MailEnviado from './mailEnviadoContraseña';

import MensajeCompraExitosa from './vistas/chofer/elementos/mensajeCompraExistorsa';
import CheckOut from './vistas/chofer/checkOut';

import CuestionariosCovidPasaje from './vistas/chofer/cuestionariosCovidPasaje';
import ComprarPasajeChofer from './vistas/chofer/comprarPasajeChofer';

import RegistrarAUsuario from './vistas/chofer/RegistrarAUnUsuario';

const Nav = () => {
  const store = useSelector((store) => store.combix.sesion);

  function RednerNavAdmin() {
    if (
      Object.keys(store).length > 0 &&
      store.permissions === '6094d45f56d99b266076c0bf'
    ) {
      return <NavAdminLogeado></NavAdminLogeado>;
    }

    return null;
  }

  function RednerNavChofer() {
    if (
      Object.keys(store).length > 0 &&
      store.permissions === '6094d50128e541353c8cf122'
    ) {
      return <NavChoferLogeado></NavChoferLogeado>;
    }

    return null;
  }

  return (
    <div>
      <Router history={history}>
        {Object.keys(store).length === 0 && (
          <Navbar
            expand='lg'
            variant='dark'
            style={{ backgroundColor: '#135671' }}
          >
            <Link to='/'>
              <Navbar.Brand>
                <img
                  src={combixLogo}
                  width='15%'
                  className='d-inline-block align-top ml-5'
                  alt='Combix logo'
                />
              </Navbar.Brand>
            </Link>

            <Link className='navbar-brand nav-link ' to='/contact'>
              <h5>Contactanos</h5>
            </Link>
            <Link
              className='navbar-brand nav-link btn mr-5'
              style={{ backgroundColor: '#0f172e' }}
              to='/login'
            >
              <h5> Iniciar Sesion</h5>
            </Link>
          </Navbar>
        )}
        <RednerNavAdmin></RednerNavAdmin>
        <RednerNavChofer></RednerNavChofer>
        <Switch>
          <Route path='/olvideMiContraseña'>
            <OlvideContraseña></OlvideContraseña>
          </Route>
          <Route path='/mailEnviado'>
            <MailEnviado></MailEnviado>
          </Route>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='/chofer/mensajeCompraExitosa'>
            <MensajeCompraExitosa></MensajeCompraExitosa>
          </Route>
          <Route path='/chofer/checkOut'>
            <CheckOut></CheckOut>
          </Route>
          <Route path='/chofer/register'>
            <RegistrarAUsuario></RegistrarAUsuario>
          </Route>
          <Route path='/chofer/comprarPasajeChofer'>
            <ComprarPasajeChofer></ComprarPasajeChofer>
          </Route>
          <Route path='/chofer/covid'>
            <CuestionariosCovidPasaje></CuestionariosCovidPasaje>
          </Route>
          <Route path='/chofer/vistaChofer'>
            <VistaChofer></VistaChofer>
          </Route>
          <Route path='/chofer/viaje'>
            <VistaDetalle></VistaDetalle>
          </Route>

          <Route path='/client'>
            <HomeCliente></HomeCliente>
          </Route>
          <Route path='/contact'>
            <h1>contact Component</h1>
          </Route>

          <Route path='/admin'>
            <VistaAdmin permisions={store.permissions}></VistaAdmin>
          </Route>

          <Route path='/'>
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Nav;
