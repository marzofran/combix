import React from 'react';

const ViajesAdmin = () => {
  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col-9'>
            <h3 style={{color: '#357185'}}>Viajes</h3>
          </div>
          <div className='col'>
            <button
              style={{backgroundColor: '#145572'}}
              className={'btn btn-primary btn-block'}
              type='button'
            >
              + Crear nuevo viaje
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViajesAdmin;
