import React from 'react';
import history from '../../history';
import MisViajesChofer from './misViajes';

const VistaChofer = (props) => {

  function redireccionar() {
    history.push('/');
    alert('no tienes permisos');
  }

  return (
    <div style={{backgroundColor: '#71b3ff', minHeight: '100vh'}}>
      {props.permisions === '6094d50128e541353c8cf122' ? (
        <MisViajesChofer></MisViajesChofer>
      ) : (
        redireccionar()
      )}
    </div>
  );
};

export default VistaChofer;
