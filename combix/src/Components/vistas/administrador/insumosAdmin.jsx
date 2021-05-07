import React from 'react';
import Insumo from './elementos/insumo'

const InsumosAdmin = () => {
  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col-9'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}>Insumos</h3>
          </div>
          <div className='col'>
            <button
              style={{backgroundColor: '#145572'}}
              className={'btn btn-primary btn-block'}
              type='button'
            >
              + Crear nuevo insumo
            </button>
          </div>
        </div>
        {/* hardcodeado, pasar a un map cuando haya getter*/}
        <div className='row'>
            <Insumo item={{ nombre: 'Papitas', tipo: 'Salado'}}></Insumo>
        </div>
      </div>
    </div>
  );
};

export default InsumosAdmin;
