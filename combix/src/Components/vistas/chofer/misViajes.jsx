import React from 'react';
import {useSelector} from 'react-redux';

const {toTitleCase} = require('../../../scripts/toTitleCase')

const MisViajesChofer = () => {
  
  const chofer = useSelector((store) => store.combix.sesion);

  return (
    <div className="container">
      <h2 style={{color: 'white', fontSize: '40px'}} className={'pt-3 pb-3'}>Bienvenido, {toTitleCase(chofer.nombre)}</h2>
    </div>
  );
};

export default MisViajesChofer;
