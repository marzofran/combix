import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {cargarViajes} from '../../../Redux/choferDucks';
import ViajeElemento from './elementos/viaje';
const {toTitleCase} = require('../../../scripts/toTitleCase');

const MisViajesChofer = () => {
  const chofer = useSelector((store) => store.combix.sesion);
  const dispatch = useDispatch();

  const viajes = useSelector((store) => store.chofer.elementos);
  useEffect(() => {
    dispatch(cargarViajes(chofer._id));
  }, []);

  return (
    <div className='container'>
      <h2 style={{color: 'white', fontSize: '40px'}} className={'pt-3 pb-3'}>
        Bienvenido, {toTitleCase(chofer.nombre)}
      </h2>
      <div>
        Pendientes:{' '}
        {viajes.pendientes.length > 0 &&
          viajes.pendientes.map((e) => (
            <h2>{<ViajeElemento item={e}></ViajeElemento>}</h2>
          ))}
      </div>
      <div>
        Finalizados:
        {viajes.finalizado.length > 0 &&
          viajes.finalizado.map((e) => (
            <h2>{<ViajeElemento item={e}></ViajeElemento>}</h2>
          ))}
      </div>
      <div>
        En Curso:
        {viajes.enCurso.length > 0 &&
          viajes.enCurso.map((e) => (
            <h2>{<ViajeElemento item={e}></ViajeElemento>}</h2>
          ))}
      </div>
    </div>
  );
};

export default MisViajesChofer;
