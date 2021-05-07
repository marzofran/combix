import React from 'react';

const ViajesAdmin = () => {
  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col-9'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}>Viajes</h3>
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
        <div className='row'>
            <ul>

            </ul>
        </div>
      </div>
    </div>
  );
};

export default ViajesAdmin;
