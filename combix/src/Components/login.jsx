import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {obtenerDatosUsuarioAccion} from '../Redux/combixDucks';

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
    <div className={'container'}>
      <form onSubmit={handleSubmit}>
        <div className={'form-group'}>
          <label>Direccion de Email</label>
          <input
            type='email'
            className={'form-control'}
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            placeholder='Enter email'
            onChange={handleChangeMail}
          />
        </div>
        <div className={'form-group'}>
          <label>Contraseña</label>
          <input
            type='password'
            className={'form-control'}
            id='exampleInputPassword1'
            placeholder='Password'
            onChange={handleChangePassword}
          />
        </div>

        <button className={'btn btn-primary'}>Submit</button>
      </form>
    </div>
  );
};

export default Login;
