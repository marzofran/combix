import React from 'react';
import {Navbar} from 'react-bootstrap';
import {Router, Switch, Route, Link} from 'react-router-dom';
import Login from './login';
import Home from './home';
import history from './history';
import Loged from './loged';
import combixLogo from '../resources/CombixWhite.png';
import {useSelector} from 'react-redux';

const Nav = () => {
  const store = useSelector((store) => store.combix.sesion);
  return (
    <div>
      <Router history={history}>
        <Navbar expand='lg' variant='dark' style={{backgroundColor: '#135671'}}>
          <Link to='/'>
            <Navbar.Brand>
              <img
                src={combixLogo}
                width='20%'
                className='d-inline-block align-top'
                alt='Combix logo'
              />
            </Navbar.Brand>
          </Link>
          <a className='navbar-brand nav-link ' href='#bottom'>
            <h5>Sobre nosotros</h5>
          </a>
          <Link className='navbar-brand nav-link ' to='/contact'>
            <h5>Contactanos</h5>
          </Link>

          {Object.keys(store).length === 0 ? (
            <Link
              className='navbar-brand nav-link btn'
              style={{backgroundColor: '#0f172e'}}
              to='/login'
            >
              <h5> Iniciar Sesion</h5>
            </Link>
          ) : (
            <Link
              className='navbar-brand nav-link btn'
              to='/login'
              style={{backgroundColor: '#0f172e'}}
            >
              <h5> Cerrar sesion</h5>
            </Link>
          )}
        </Navbar>
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
          <Route path='/'>
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Nav;
