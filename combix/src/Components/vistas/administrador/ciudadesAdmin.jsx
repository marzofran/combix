import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {registrarCiudad} from '../../../Redux/combixDucks';
import Ciudad from './elementos/ciudad';
import {cargarCiudades} from '../../../Redux/combixDucks';

const CiudadesAdmin = () => {
  const dispatch = useDispatch();
  const [cargar, setCargar] = useState(true);
  useEffect(() => {
    dispatch(cargarCiudades());
    setCargar(true);
  }, [cargar, dispatch]);

  const [provincia, setProvincia] = useState('provincia');
  const [lugar, setLugar] = useState('Lugar');

  const handleChangeLugar = (e) => {
    setLugar(e.target.value);
  };
  const handleChangeProvincia = (e) => {
    setProvincia(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registrarCiudad(lugar, provincia));
    setCargar(false);
  };
  function cambiarEstado() {
    setCargar(false);
  }
  const ciudades = useSelector((store) => store.combix.ciudades);

  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col-9'>
            <h3 style={{color: '#357185'}}>Ciudades</h3>
          </div>
          <div className='col'>
            <button
              type='button'
              className={'btn btn-primary btn-block'}
              style={{backgroundColor: '#145572'}}
              data-toggle='modal'
              data-target='#exampleModal'
            >
              + Crear nueva ciudad
            </button>
          </div>
        </div>
        <div className='row'>
          {ciudades.map((item) => (
            <Ciudad item={item} key={item._id} estado={cambiarEstado}></Ciudad>
          ))}
        </div>
      </div>

      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='modalCiudad'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalCiudad'>
                Cargar nueva ciudad
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='lugar'>Provincia</label>
                  <input
                    required
                    type='text'
                    className='form-control'
                    id='lugar'
                    aria-describedby='Lugar'
                    placeholder='Ingresa la provincia'
                    onChange={handleChangeProvincia}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='lugar'>Lugar de la ciudad</label>
                  <input
                    type='text'
                    className='form-control'
                    id='lugar'
                    aria-describedby='Lugar'
                    placeholder='Ingresa el lugar'
                    required
                    onChange={handleChangeLugar}
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{backgroundColor: '#145572'}}
                >
                  Guardar ciudad
                </button>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CiudadesAdmin;
