import React from 'react';
import history from '../../history';
import NavAdmin from './navAdmin';

const VistaAdmin = (props) => {
  function redireccionar() {
    history.push('/');
    alert('no tienes permisos');
  }
  return (
    <div>
      {props.permisions === 'administrador' ? (
        <NavAdmin></NavAdmin>
      ) : (
        redireccionar()
      )}
    </div>
  );
};

export default VistaAdmin;
