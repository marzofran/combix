import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {obtenerDatosUsuarioAccion} from '../Redux/combixDucks';
import {Link} from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState(123456);
  const [mail, setMail] = useState('Ingrese el mail');

  const handleChangeMail = (e) => {
    setMail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(obtenerDatosUsuarioAccion(mail, password));
  };
  return (
    <div className='image-login'>
      <div className={'container'}>
        <h1 className={'text-center titulo-login'} style={{color: 'white'}}>
          Viajá seguro. Viajá CombiX.
        </h1>
        <div className='login-padre'>
          <div className='card  login-hijo'>
            <form onSubmit={handleSubmit}>
              <div className='card-title'>
                <Link to='/'>
                  <p className={'h5'} style={{color: 'black'}}>
                    <i className='fa fa-arrow-left mr-2' aria-hidden='true'></i>
                    Volver
                  </p>
                </Link>

                <h2 className={'mt-3 mb-3'}>Iniciá sesion</h2>
              </div>
              <div className={'form-group'}>
                <label>Email</label>
                <input
                  type='email'
                  className={'form-control'}
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Ingresa tu Email'
                  required
                  onChange={handleChangeMail}
                />
              </div>
              <div className={'form-group'}>
                <label>Contraseña</label>
                <input
                  type='password'
                  required
                  className={'form-control'}
                  id='exampleInputPassword1'
                  placeholder='Ingresa tu contraseña'
                  onChange={handleChangePassword}
                />
              </div>

              <button className={'btn btn-login mt-4'}>Iniciá Sesión</button>
              <p
                className={'mt-4 h4'}
                style={{textDecorationLine: 'underline'}}
              >
                Olvidé mi contraseña
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
