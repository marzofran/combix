import React from 'react';
import ViajeElemento from './elementos/viaje';
import HeaderListas from './elementos/headerListas';

const ViajesPendientes = (props) => {

  const viajes = props.viajes.pendientes

  return (
    <div className='container'>
      <HeaderListas viajes={props.viajes.enCurso}></HeaderListas>
      <div>
        Pendientes:{' '}
        {viajes.length > 0 &&
          viajes.map((e) => (
            <h2>{<ViajeElemento item={e}></ViajeElemento>}</h2>
          ))}
      </div>
    </div>
  );
};

export default ViajesPendientes;
