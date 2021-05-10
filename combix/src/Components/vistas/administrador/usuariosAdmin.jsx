import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Usuario from './elementos/usuario';
import {cargarUsuarios} from '../../../Redux/combixDucks';

//Implementado, falta cargar
const UsuariosAdmin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cargarUsuarios());
  }, []);

  const usuarios = useSelector((store) => store.combix.usuarios);

  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}>Usuarios</h3>
          </div>
        </div>
        <div className='col'>
          {usuarios.map((item) => (
            <Usuario item={item} key={item._id}></Usuario>
          ))}
        </div>
      </div>
    </div>
  )

};

export default UsuariosAdmin;