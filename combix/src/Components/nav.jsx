import React from 'react';
import {Navbar} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Login from './login';
import Home from './home';

import combixLogo from '../resources/CombixWhite.png';

const Nav = () => {
  return (
    <div>
      <Router>
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
          <Link className='navbar-brand nav-link ' to='/aboutus'>
            Sobre nosotros
          </Link>
          <Link className='navbar-brand nav-link ' to='/contact'>
            Contactanos
          </Link>
          <Link
            className='navbar-brand nav-link btn'
            style={{backgroundColor: '#0f172e'}}
            to='/login'
          >
            Iniciar Sesion
          </Link>
        </Navbar>
        <Switch>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='/aboutus'>
            <h1>aboutus Component</h1>
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
