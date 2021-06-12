import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {cargarPasajes} from '../../../Redux/clienteDucks';
import Pasaje from './elementos/pasaje';
const MisPasajes = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const pasajes = useSelector((store) => store.cliente.elementos);
  const sesion = useSelector((store) => store.combix.sesion);

  useEffect(() => {
    dispatch(cargarPasajes(sesion._id));
  }, []);
  return (
    <div>
      <h1>Mis pasajes</h1>
      {pasajes.map((item) => (
        <Pasaje item={item}></Pasaje>
      ))}
      ;
    </div>
  );
};

export default MisPasajes;
