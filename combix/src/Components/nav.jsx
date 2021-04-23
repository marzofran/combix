import React from 'react';
import {
  Container,
  Row,
  Col,
  Navbar,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <Router>
        <Navbar expand='lg' variant='dark' style={{backgroundColor: '#135671'}}>
          <Container>
            <Navbar.Brand href='#'>
              <img
                src='https://iili.io/BdjqsS.png'
                width='40%'
                className='d-inline-block align-top'
                alt='Combix logo'
              />
            </Navbar.Brand>
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
          </Container>
          <Switch>
            <Route path='/login'>
              <h1>iniciarSesion Component</h1>
            </Route>
            <Route path='/aboutus'>
              <h1>aboutus Component</h1>
            </Route>
            <Route path='/contact'>
              <h1>contact Component</h1>
            </Route>
          </Switch>
        </Navbar>
      </Router>
    </div>
  );
};

export default Nav;
