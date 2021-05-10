import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {registrarInsumo} from '../../../Redux/combixDucks';
import Insumo from './elementos/insumo';
import {cargarInsumos} from '../../../Redux/combixDucks';

//Implementado
const InsumosAdmin = () => {
  const dispatch = useDispatch();
  const [cargar, setCargar] = useState(true);
  useEffect(() => {
    setCargar(true);
    dispatch(cargarInsumos());
  }, [cargar, dispatch]);

  const [nombre, setNombre] = useState('nombre');
  const [tipo, setTipo] = useState('tipo');
  const [precio, setPrecio] = useState('precio');

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };
  const handleChangeTipo = (e) => {
    setTipo(e.target.value);
  };
  const handleChangePrecio = (e) => {
    setPrecio(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registrarInsumo(nombre, tipo, precio));
    setCargar(false);
  };
  function cambiarEstado() {
    setCargar(false);
  }
  const insumos = useSelector((store) => store.combix.insumos);

  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col-9'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}>Insumos</h3>
          </div>
          <div className='col'>
            <button
              type='button'
              style={{backgroundColor: '#145572'}}
              className={'btn btn-primary btn-block'}
              data-toggle='modal'
              data-target='#exampleModal'
            >
              + Crear nuevo insumo
            </button>
          </div>
        </div>
        <div className='col'>
          {insumos.map((item) => (
            <Insumo item={item} key={item._id} estado={cambiarEstado}></Insumo>
          ))}
        </div>
      </div>
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='modalInsumo'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalInsumo'>
                Cargar nuevo insumo
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
                  <label htmlFor='lugar'>Nombre</label>
                  <input
                    required
                    type='text'
                    className='form-control'
                    id='nombre'
                    aria-describedby='Nombre'
                    placeholder='Ingresa el nombre'
                    onChange={handleChangeNombre}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='tipo'>Tipo</label>
                  <input
                    type='text'
                    className='form-control'
                    id='tipo'
                    aria-describedby='Tipo'
                    placeholder='Ingresa el tipo'
                    required
                    onChange={handleChangeTipo}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='precio'>Precio</label>
                  <input
                    required
                    type='text'
                    className='form-control'
                    id='precio'
                    aria-describedby='Precio'
                    placeholder='Ingresa el precio'
                    onChange={handleChangePrecio}
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{backgroundColor: '#145572'}}
                  onClick={() => {
                    cambiarEstado();
                  }}
                >
                  Guardar insumo
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

export default InsumosAdmin;
