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
      {props.permisions === '6094d45f56d99b266076c0bf' ? (
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
