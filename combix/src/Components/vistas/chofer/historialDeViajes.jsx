import React from 'react';
import ViajeElemento from './elementos/viaje';
import HeaderListas from './elementos/headerListas';

const HistorialDeViajes = (props) => {

  const viajes = props.viajes.finalizado

  return (
    <div className='container'>
      <HeaderListas viajes={props.viajes.enCurso}></HeaderListas>
      <div>
        Finalizados:
        {viajes.length > 0 &&
          viajes.map((e) => (
            <h2>{<ViajeElemento item={e}></ViajeElemento>}</h2>
          ))}
      </div>
    </div>
  );
};

export default HistorialDeViajes;