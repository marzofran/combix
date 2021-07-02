import React from 'react';

const ListaDePasajeros = (props) => {
  return (
    <div>
      <h1>{props.item.precio}</h1>
    </div>
  );
};

export default ListaDePasajeros;