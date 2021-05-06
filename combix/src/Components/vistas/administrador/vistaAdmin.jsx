import React from 'react';
import history from '../../history';
import NavAdmin from './navAdmin';

const VistaAdmin = (props) => {
  function redireccionar() {
    history.push('/');
    alert('no tienes permisos');
  }
  return (
    <div style={{backgroundColor: '#71b3ff', height: '100vh'}}>
      {props.permisions === 'administrador' ? (
        <div>
          <NavAdmin></NavAdmin>
        </div>
      ) : (
        redireccionar()
      )}
    </div>
  );
};

export default VistaAdmin;
