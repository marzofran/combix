import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {registrarCombi} from '../../../Redux/combixDucks';
import Combi from './elementos/combi';
import {cargarCombis} from '../../../Redux/combixDucks';
import {cargarChoferes} from '../../../Redux/combixDucks';

//Implementado, faltan cruds
const CombisAdmin = () => {
  const dispatch = useDispatch();
  const [cargar, setCargar] = useState(true);

  useEffect(() => {
    setCargar(true);
    dispatch(cargarCombis());
  }, [cargar, dispatch]);

  const [patente, setPatente] = useState('patente');
  const [modelo, setModelo] = useState('modelo');
  const [cantidadAsientos, setCantidadAsientos] = useState('cantidadAsientos');
  const [tipo, setTipo] = useState('tipo');
  const [chofer, setChofer] = useState('chofer');
  
  function cambiarEstado() {
    setCargar(false);
  }
  const handleChangePatente = (e) => {
    setPatente(e.target.value);
  };
  const handleChangeModelo = (e) => {
    setModelo(e.target.value);
  };
  const handleChangeCantidadAsientos = (e) => {
    setCantidadAsientos(e.target.value);
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
    console.log(chofer);
    dispatch(registrarCombi(patente, modelo, cantidadAsientos, chofer, tipo));
    setCargar(false);
  };

  const choferes = useSelector((store) => store.combix.choferes);
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
              onClick={() => {
                dispatch(cargarChoferes());
              }}
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
        <div className='modal-dialog modal-dialog-centered' role='document'>
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
                    placeholder='Ingrese la patente'
                    required
                    onChange={handleChangePatente}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='modelo'>Modelo:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='modelo'
                    aria-describedby='Modelo'
                    placeholder='Ingrese el modelo'
                    required
                    onChange={handleChangeModelo}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='asientos'>Cantidad de asientos:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='asientos'
                    aria-describedby='Asientos'
                    placeholder='Ingrese la cantidad'
                    required
                    onChange={handleChangeCantidadAsientos}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='tipo'>Tipo:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='tipo'
                    aria-describedby='Tipo'
                    placeholder='Ingrese el tipo'
                    required
                    onChange={handleChangeTipo}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='chofer'>Chofer:</label>
                  <select
                    onChange={handleChangeChofer}
                    id='chofer'
                    required
                    class='form-control'
                  >
                    <option>Seleccione un chofer</option>
                    {choferes.map((item) => (
                      <option value={JSON.stringify(item)}>
                        {item.apellido}, {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>

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
        </div>
      </div>
    </div>
  );
};

export default CombisAdmin;

/**/
