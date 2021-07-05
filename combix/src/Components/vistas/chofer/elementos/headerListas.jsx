import React from 'react';
import {useSelector} from 'react-redux';
import ViajeEnCurso from './viajeEnCurso';

const {toTitleCase} = require('../../../../scripts/toTitleCase');

const HeaderListas = (props) => {

    const chofer = useSelector((store) => store.combix.sesion);

  return (
    <div>
        <h2 style={{color: 'white', fontSize: '40px'}} className={'pt-3 pb-3'}>
            Bienvenido, {toTitleCase(chofer.nombre)}
        </h2>
        <div>
            {props.viajes.length > 0 &&
              props.viajes.map((e) => (
                <>
                En Curso:
                <h2>{<ViajeEnCurso item={e}></ViajeEnCurso>}</h2>
                </>
              ))}
        </div>
    </div>
  );
};

export default HeaderListas;


