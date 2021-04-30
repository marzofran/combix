import React from 'react';
import {useSelector} from 'react-redux';
const Loged = () => {
  const store = useSelector((store) => store.combix);
  return (
    <div>
      <h3>
        logeado como {store.sesion.nombre} {store.sesion.apellido}
      </h3>
    </div>
  );
};

export default Loged;
