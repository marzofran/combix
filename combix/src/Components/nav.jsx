import React from 'react';
import {Navbar} from 'react-bootstrap';
import {Router, Switch, Route, Link} from 'react-router-dom';
import Login from './login';
import Home from './home';
import history from './history';
import VistaAdmin from './vistas/administrador/vistaAdmin';
import combixLogo from '../resources/CombixWhite.png';
import {useSelector} from 'react-redux';
import NavUsuarioLogeado from './navUsuarioLogeado';
import NavAdminLogeado from './navAdminLogeado';
import HomeCliente from './vistas/cliente/homeCliente';
import OlvideContraseña from './olvideMiContraseña';
import MailEnviado from './mailEnviadoContraseña';
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

  return (
    <div>
      <Router history={history}>
        {Object.keys(store).length === 0 && (
          <Navbar
            expand='lg'
            variant='dark'
            style={{backgroundColor: '#135671'}}
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
              style={{backgroundColor: '#0f172e'}}
              to='/login'
            >
              <h5> Iniciar Sesion</h5>
            </Link>
          </Navbar>
        )}
        <RednerNavAdmin></RednerNavAdmin>
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
