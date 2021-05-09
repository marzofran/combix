import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {registrarRuta} from '../../../Redux/combixDucks';
import Ruta from './elementos/ruta';
import {cargarRutas} from '../../../Redux/combixDucks';
import {cargarCiudades} from '../../../Redux/combixDucks';
import {cargarCombis} from '../../../Redux/combixDucks';

const RutasAdmin = () => {
  const dispatch = useDispatch();
  const [cargar, setCargar] = useState(true);

  useEffect(() => {
    setCargar(true);
    dispatch(cargarRutas());
  }, [cargar, dispatch]);

  const [origen, setOrigen] = useState('origen');
  const [destino, setDestino] = useState('destino');
  const [combi, setCombi] = useState('combi');
  const [horario, setHorario] = useState('Horario');

  const handleChangeOrigen = (e) => {
    let obj = JSON.parse(e.target.value);
    setOrigen(obj);
  };
  const handleChangeDestino = (e) => {
    let obj = JSON.parse(e.target.value);
    setDestino(obj);
    dispatch(cargarCombis());
  };
  const handleChangeCombi = (e) => {
    let obj = JSON.parse(e.target.value);
    setCombi(obj);
  };
  const handleChangeHorario = (e) => {
    setHorario(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(origen, destino, combi, horario);
    dispatch(registrarRuta(origen, destino, combi, horario));
    setCargar(false);
  };
  function cambiarEstado() {
    setCargar(false);
  }

  const rutas = useSelector((store) => store.combix.rutas);
  const ciudades = useSelector((store) => store.combix.ciudades);
  const combis = useSelector((store) => store.combix.combis);

  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col-9'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}>Rutas</h3>
          </div>
          <div className='col'>
            <button
              type='button'
              className={'btn btn-primary btn-block'}
              style={{backgroundColor: '#145572'}}
              data-toggle='modal'
              data-target='#exampleModal'
              onClick={() => {
                dispatch(cargarCiudades());
              }}
            >
              + Crear nueva ruta
            </button>
          </div>
        </div>
        <div className='col'>
          {rutas.map((item) => (
            <Ruta item={item} key={item._id} estado={cambiarEstado}></Ruta>
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
                Cargar nueva ruta
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
                  <label htmlFor='lugar'>Origen</label>

                  <select
                    onChange={handleChangeOrigen}
                    id='origen'
                    required
                    class='form-control'
                  >
                    <option>Seleccione un origen</option>
                    {ciudades.map((item, index) => (
                      <option value={JSON.stringify(item)}>
                        {item.provincia}, {item.lugar}
                      </option>
                    ))}
                  </select>
                </div>
                {origen !== 'origen' && (
                  <div className='form-group'>
                    <label htmlFor='lugar'>Destino:</label>
                    <select
                      onChange={handleChangeDestino}
                      id='origen'
                      required
                      class='form-control'
                    >
                      <option>Seleccione un destino</option>
                      {ciudades.map(
                        (item) =>
                          origen.provincia !== item.provincia && (
                            <option value={JSON.stringify(item)}>
                              {item.provincia}, {item.lugar}
                            </option>
                          )
                      )}
                    </select>
                  </div>
                )}
                {destino !== 'destino' && (
                  <div className='form-group'>
                    <label htmlFor='lugar'>Combi:</label>
                    <select
                      onChange={handleChangeCombi}
                      id='combi'
                      required
                      class='form-control'
                    >
                      <option>Seleccione una combi</option>
                      {combis.map((item) => (
                        <option value={JSON.stringify(item)}>
                          {item.modelo}, {item.patente}, {item.asientos}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {combi !== 'combi' && (
                  <div className='form-group'>
                    <label htmlFor='lugar'>Horario:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='lugar'
                      aria-describedby='Lugar'
                      placeholder='Seleccion el horario'
                      required
                      onChange={handleChangeHorario}
                    />
                  </div>
                )}
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

export default RutasAdmin;