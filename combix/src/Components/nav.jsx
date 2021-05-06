import React from 'react';
import {Navbar} from 'react-bootstrap';
import {Router, Switch, Route, Link} from 'react-router-dom';
import Login from './login';
import Home from './home';
import history from './history';
import Loged from './loged';
import VistaAdmin from './vistas/administrador/vistaAdmin';
import combixLogo from '../resources/CombixWhite.png';
import {useSelector} from 'react-redux';

import NavAdminLogeado from './navAdminLogeado';
const Nav = () => {
  const store = useSelector((store) => store.combix.sesion);

  function RednerNavAdmin() {
    if (
      Object.keys(store).length > 0 &&
      store.permissions === 'administrador'
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
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='/loged'>
            <Loged></Loged>
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
