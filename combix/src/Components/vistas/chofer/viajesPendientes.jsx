import React from 'react';
import ViajeElemento from './elementos/viaje';

const ViajesPendientes = (props) => {

  return (
    <div className='container'>
      <div>
        Pendientes:{' '}
        {props.viajes.length > 0 &&
          props.viajes.map((e) => (
            <h2>{<ViajeElemento item={e}></ViajeElemento>}</h2>
          ))}
      </div>
    </div>
  );
};

export default ViajesPendientes;
