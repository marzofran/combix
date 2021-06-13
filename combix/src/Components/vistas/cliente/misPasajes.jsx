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
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col-9'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}>Mis Pasajes</h3>
          </div>
        </div>
        <div className='col'>
          {pasajes.map((item) => (
            <Pasaje item={item}></Pasaje>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MisPasajes;
