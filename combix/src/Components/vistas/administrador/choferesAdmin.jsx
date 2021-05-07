import React from 'react';
import Chofer from './elementos/chofer'

const ChoferesAdmin = () => {
  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col-9'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}>Choferes</h3>
          </div>
          <div className='col'>
            <button
              style={{backgroundColor: '#145572'}}
              className={'btn btn-primary btn-block'}
              type='button'
            >
              + Crear nuevo chofer
            </button>
          </div>
        </div>
         {/* hardcodeado, pasar a un map cuando haya getter*/}
        <div className='row'>
            <Chofer item={{ nombre: 'Papitas', tipo: 'Salado'}}></Chofer>
        </div>
      </div>
    </div>
  );
};

export default ChoferesAdmin;
