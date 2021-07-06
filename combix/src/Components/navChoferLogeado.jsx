import React from 'react';
import {Router, Link, Switch, Route} from 'react-router-dom';
import {Navbar, Row, Col} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import combixLogo from '../resources/CombixWhite.png';
import {cerrarSesion} from '../Redux/combixDucks';
import VistaChofer from './vistas/chofer/vistaChofer';
import VistaDetalle from './vistas/chofer/vistaDetalle';
import history from './history';

const NavChoferLogeado = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Router history={history}>
        <Navbar expand='lg' variant='dark' style={{backgroundColor: '#135671'}}>
          <Row>
            <Col>
              <Link to='/chofer/vistaChofer/pendientes'>
                <img
                  src={combixLogo}
                  width='55%'
                  className='d-inline-block align-top mt-2 ml-5'
                  alt='Combix logo'
                />
              </Link>
            </Col>
            <Col>
              <Link
                className='navbar-brand nav-link btn mr-5'
                onClick={() => dispatch(cerrarSesion())}
                to='/login'
                style={{backgroundColor: 'red'}}
              >
                <h5> Cerrar sesion</h5>
              </Link>
            </Col>
          </Row>
        </Navbar>
      </Router>
    </div>
  );
};

export default NavChoferLogeado;
