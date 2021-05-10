import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import combixLogo from '../resources/CombixWhite.png';
import {cerrarSesion} from '../Redux/combixDucks';
const NavUsuarioLogeado = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Navbar expand='lg' variant='dark' style={{backgroundColor: '#135671'}}>
        <Link to='/admin'>
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
          onClick={() => dispatch(cerrarSesion())}
          to='/login'
          style={{backgroundColor: 'red'}}
        >
          <h5> Cerrar sesion</h5>
        </Link>
      </Navbar>
    </div>
  );
};

export default NavUsuarioLogeado;
