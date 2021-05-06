import React from 'react';
const Ciudad = (props) => {
  return (
    <div className='col-6'>
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col'>
              <i class='fa fa-map-marker' aria-hidden='true'></i>
              <h7>Provincia:{props.item.provincia}</h7>
            </div>
            <div className='col'>
              <i class='fa fa-location-arrow' aria-hidden='true'></i>
              <h7>Lugar:{props.item.lugar}</h7>
            </div>
          </div>
          <button>Editar</button>
          <button>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default Ciudad;
