import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Viaje from './elementos/viaje';
import {cargarViajes} from '../../../Redux/combixDucks';
import {cargarRutas} from '../../../Redux/combixDucks';
import {registrarViaje} from '../../../Redux/combixDucks';

//Implementado, faltan cruds
const ViajesAdmin = () => {
  const dispatch = useDispatch();
  const [cargar, setCargar] = useState(true);

  useEffect(() => {
    setCargar(true);
    dispatch(cargarRutas());
    dispatch(cargarViajes());
    console.log('brus');
  }, [dispatch, cargar]);

  const [ruta, setRuta] = useState('ruta');
  const [fecha, setFecha] = useState('fecha');
  const [precio, setPrecio] = useState('precio');

  const handleChangeRuta = (e) => {
    let obj = JSON.parse(e.target.value);
    setRuta(obj);
  };
  const handleChangeFecha = (e) => {
    setFecha(e.target.value);
    console.log(Date.parse(e.target.value));
  };
  const handleChangePrecio = (e) => {
    let obj = JSON.parse(e.target.value);
    setPrecio(obj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(ruta, fecha, precio);
    dispatch(registrarViaje(ruta, fecha, precio));
    cambiarEstado();
  };
  function cambiarEstado() {
    setCargar(false);
    console.log('xd');
  }

  const rutas = useSelector((store) => store.combix.rutas);
  const viajes = useSelector((store) => store.combix.viajes);

  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col-9'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}>Viajes</h3>
          </div>
          <div className='col'>
            <button
              type='button'
              className={'btn btn-primary btn-block'}
              style={{backgroundColor: '#145572'}}
              data-toggle='modal'
              data-target='#exampleModal'
            >
              + Crear nuevo viaje
            </button>
          </div>
        </div>
        <div className='col'>
          {viajes.map((item) => (
            <Viaje estado={cambiarEstado} item={item} key={item._id}></Viaje>
          ))}
        </div>
      </div>
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='modalViaje'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalViaje'>
                Cargar nuevo viaje
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
                  <label htmlFor='ruta'>Ruta:</label>

                  <select
                    onChange={handleChangeRuta}
                    id='ruta'
                    required
                    class='form-control'
                  >
                    <option>Seleccione una ruta</option>
                    {rutas.map((item, index) => (
                      <option value={JSON.stringify(item)}>
                        {item.origen.lugar} ({item.origen.provincia}) {'->'}
                        {item.destino.lugar} ({item.destino.provincia})
                      </option>
                    ))}
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='fecha'>Fecha:</label>
                  <input
                    type='date'
                    className='form-control'
                    id='fecha'
                    aria-describedby='Fecha'
                    placeholder='Seleccione una fecha'
                    required
                    onChange={handleChangeFecha}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='precio'>Precio:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='precio'
                    aria-describedby='Precio'
                    placeholder='Seleccione el precio'
                    required
                    onChange={handleChangePrecio}
                  />
                </div>

                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{backgroundColor: '#145572'}}
                  onClick={() => cambiarEstado()}
                >
                  Guardar viaje
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

export default ViajesAdmin;
