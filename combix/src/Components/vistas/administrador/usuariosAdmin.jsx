import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Usuario from './elementos/usuario';
//import {cargarUsuarios} from '../../../Redux/combixDucks';

//Implementado, falta cargar
const UsuariosAdmin = () => {
  //dispatch(cargarUsuarios());
  //const usuarios = useSelector((store) => store.combix.usuarios);

  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}>Usuarios</h3>
          </div>
        </div>
        <div className='col'>
          <Usuario item={{ nombre: 'Place', apellido: 'Holder'}}></Usuario>
        </div>
      </div>
    </div>
  )

};

export default UsuariosAdmin;