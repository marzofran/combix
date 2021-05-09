import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//import {registrarCombi} from '../../../Redux/combixDucks';
import Combi from './elementos/combi';
import {cargarCombis} from '../../../Redux/combixDucks';
//import {cargarChoferes} from '../../../Redux/combixDucks';

const CombisAdmin = () => {
  const dispatch = useDispatch();
  const [cargar, setCargar] = useState(true);

  useEffect(() => {
    setCargar(true);
    dispatch(cargarCombis());
  }, [cargar, dispatch]);

  const [patente, setPatente] = useState('patente');
  const [modelo, setModelo] = useState('modelo');
  const [asientos, setAsientos] = useState('asientos');
  const [tipo, setTipo] = useState('tipo');
  const [chofer, setChofer] = useState('chofer');

  const handleChangePatente = (e) => {
    setPatente(e.target.value);
  };
  const handleChangeModelo = (e) => {
    setModelo(e.target.value);
  };
  const handleChangeAsientos = (e) => {
    setAsientos(e.target.value);
  };
  const handleChangeTipo = (e) => {
    setTipo(e.target.value);
  };
  const handleChangeChofer = (e) => {
    let obj = JSON.parse(e.target.value);
    setChofer(obj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(patente, modelo, asientos, tipo.replace, chofer);
    //dispatch(registrarCombi(patente, modelo, asientos, tipo, chofer));
    setCargar(false);
  };
  function cambiarEstado() {
    setCargar(false);
  }

  //const choferes = useSelector((store) => store.combix.choferes)
  const combis = useSelector((store) => store.combix.combis);

  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col-9'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}>Combis</h3>
          </div>
          <div className='col'>
            <button
              type='button'
              className={'btn btn-primary btn-block'}
              style={{backgroundColor: '#145572'}}
              data-toggle='modal'
              data-target='#exampleModal'
              /*onClick={() => {
                dispatch(cargarChoferes());
              }}*/
            >
              + Crear nueva combi
            </button>
          </div>
        </div>
        <div className='col'>
          {combis.map((item) => (
            <Combi item={item} key={item._id} estado={cambiarEstado}></Combi>
          ))}
        </div>
      </div>
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='modalCombis'
        aria-hidden='true'
      >
      
      </div>
    </div>
  );
};

export default CombisAdmin;

/*<div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalCombis'>
                Cargar nueva combi
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
                  <label htmlFor='patente'>Patente:</label>
                  <input
                      type='text'
                      className='form-control'
                      id='patente'
                      aria-describedby='Patente'
                      placeholder='Seleccione la patente'
                      required
                      onChange={handleChangePatente}
                  />
                </div>
                {patente !== 'patente' && (
                  <div className='form-group'>
                  <label htmlFor='patente'>Patente:</label>
                  <input
                      type='text'
                      className='form-control'
                      id='patente'
                      aria-describedby='Patente'
                      placeholder='Seleccione la patente'
                      required
                      onChange={handleChangePatente}
                  />
                </div>
                )}
                {destino !== 'destino' && (
                  <div className='form-group'>
                  <label htmlFor='patente'>Patente:</label>
                  <input
                      type='text'
                      className='form-control'
                      id='patente'
                      aria-describedby='Patente'
                      placeholder='Seleccione la patente'
                      required
                      onChange={handleChangePatente}
                  />
                </div>
                )}
                {destino !== 'destino' && (
                  <div className='form-group'>
                  <label htmlFor='patente'>Patente:</label>
                  <input
                      type='text'
                      className='form-control'
                      id='patente'
                      aria-describedby='Patente'
                      placeholder='Seleccione la patente'
                      required
                      onChange={handleChangePatente}
                  />
                </div>
                )}
                {combi !== 'combi' && (
                <div className='form-group'>
                  <label htmlFor='patente'>Origen</label>
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
                )}
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{backgroundColor: '#145572'}}
                >
                  Guardar combi
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
        </div>*/