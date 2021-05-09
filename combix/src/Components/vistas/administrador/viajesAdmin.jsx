import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//import {cargarViajes, registrarViaje} from '../../../Redux/combixDucks';
import Viaje from './elementos/viaje';
import {cargarRutas} from '../../../Redux/combixDucks';
//import {cargarChoferes} from '../../../Redux/combixDucks';
import {cargarCombis} from '../../../Redux/combixDucks';

//Implementado, faltan cruds
const ViajesAdmin = () => {
  const dispatch = useDispatch();
  const [cargar, setCargar] = useState(true);

  /*useEffect(() => {
    setCargar(true);
    dispatch(cargarRutas());
  }, [cargar, dispatch]);*/

  const [ruta, setRuta] = useState('ruta');
  const [fecha, setFecha] = useState('fecha');
  const [horario, setHorario] = useState('horario');
  const [precio, setPrecio] = useState('precio');
  const [combi, setCombi] = useState('combi');
  const [chofer, setChofer] = useState('chofer');

  const handleChangeRuta = (e) => {
    let obj = JSON.parse(e.target.value);
    setRuta(obj);
  };
  const handleChangeFecha = (e) => {
    let obj = JSON.parse(e.target.value);
    setFecha(obj);
  };
  const handleChangeHorario = (e) => {
    let obj = JSON.parse(e.target.value);
    setHorario(obj);
  };
  const handleChangePrecio = (e) => {
    let obj = JSON.parse(e.target.value);
    setPrecio(obj);
    dispatch(cargarCombis());
  };
  const handleChangeCombi = (e) => {
    let obj = JSON.parse(e.target.value);
    setCombi(obj);
    //dispatch(cargarChoferes());
  };
  const handleChangeChofer = (e) => {
    let obj = JSON.parse(e.target.value);
    setChofer(obj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(ruta, fecha, horario, precio, combi, chofer);
    //dispatch(registrarViaje(ruta, fecha, horario, precio, combi, chofer));
    setCargar(false);
  };
  function cambiarEstado() {
    setCargar(false);
  }

  const rutas = useSelector((store) => store.combix.rutas);
  const viajes = useSelector((store) => store.combix.viajes);
  const combis = useSelector((store) => store.combix.combis);
  const choferes = useSelector((store) => store.combix.choferes);

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
              onClick={() => {
                dispatch(cargarRutas());
              }}
            >
              + Crear nuevo viaje
            </button>
          </div>
        </div>
        <div className='col'>
          <Viaje item={{ ruta: { origen: { lugar: 'Place', provincia: 'Buenos Aires'}, destino: { lugar: 'Holder', provincia: 'Buenos Aires'} }}}></Viaje>
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
                        {item.origen.lugar} ({item.origen.provincia}) -> {item.destino.lugar} ({item.destino.provincia})
                      </option>
                    ))}
                  </select>
                </div>
                {ruta !== 'ruta' && (
                  <div className='form-group'>
                    <label htmlFor='fecha'>Fecha:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='fecha'
                      aria-describedby='Fecha'
                      placeholder='Seleccione la fecha'
                      required
                      onChange={handleChangeFecha}
                    />
                  </div>
                )}
                {fecha !== 'fecha' && (
                  <div className='form-group'>
                    <label htmlFor='horario'>Horario:</label>
                    <input
                      type='text'
                      className='form-control'
                      id='horario'
                      aria-describedby='Horario'
                      placeholder='Seleccione el horario'
                      required
                      onChange={handleChangeHorario}
                    />
                  </div>
                )}
                {horario !== 'horario' && (
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
                )}
                {precio !== 'precio' && (
                  <div className='form-group'>
                    <label htmlFor='combi'>Combi:</label>
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
                  <label htmlFor='lugar'>Chofer:</label>
                  <select
                    onChange={handleChangeChofer}
                    id='chofer'
                    required
                    class='form-control'
                  >
                    <option>Seleccione una chofer</option>
                    {choferes.map((item) => (
                      <option value={JSON.stringify(item)}>
                        {item.nombre} {item.apellido} ({item.mail})
                      </option>
                    ))}
                  </select>
                </div>
                )}
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{backgroundColor: '#145572'}}
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
