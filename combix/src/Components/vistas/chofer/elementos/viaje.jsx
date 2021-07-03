import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {seleccionarViaje} from '../../../../Redux/choferDucks';
const ViajeElemento = (props) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>{props.item.precio}</h1>
      <Link>
        <button
          onClick={() => dispatch(seleccionarViaje(props.item))}
          className={'btn btn-login mt-4'}
        >
          Ver Más
        </button>
      </Link>
    </div>
  );
};

export default ViajeElemento;
