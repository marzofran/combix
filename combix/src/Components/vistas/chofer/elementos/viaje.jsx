import React from 'react';
import {Link} from 'react-router-dom';

const ViajeElemento = (props) => {
  return (
    <div>
      <h1>{props.item.precio}</h1>
      <Link
        to={{
          pathname: './vistaDetalle/detalles',
          state: {viaje: props.item},
        }}
      >
        <button className={'btn btn-login mt-4'}>Ver Más</button>
      </Link>
    </div>
  );
};

export default ViajeElemento;
