import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {borrarCiudad, editarCiudad} from '../../../../Redux/combixDucks';
const Ciudad = (props) => {
  const dispatch = useDispatch();
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
    dispatch(editarCiudad(lugar, provincia, props.item._id));
    props.estado();
  };
  return (
    <div className='col-6'>
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col'>
              <h6>
                <i className='fa fa-map-marker' aria-hidden='true'></i>
                Provincia:{props.item.provincia}
              </h6>
            </div>
            <div className='col'>
              <h6>
                <i className='fa fa-location-arrow' aria-hidden='true'></i>
                Lugar:{props.item.lugar}
              </h6>
            </div>
          </div>
          <button data-toggle='modal' data-target={'#' + props.item.lugar}>
            Editar
          </button>
          <button
            onClick={() => {
              dispatch(borrarCiudad(props.item.lugar, props.item.provincia));
              props.estado();
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
      <div
        className='modal fade'
        id={props.item.lugar}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='modalCiudad'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalCiudad'>
                Editar provincia, {props.item.provincia} {props.item.lugar}
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
                  <label htmlFor='lugar'>Nueva, provincia</label>
                  <input
                    required
                    type='text'
                    className='form-control'
                    id='lugar'
                    aria-describedby='Lugar'
                    onChange={handleChangeProvincia}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='lugar'>Nuevo, Lugar de la ciudad</label>
                  <input
                    type='text'
                    className='form-control'
                    id='lugar'
                    aria-describedby='Lugar'
                    required
                    onChange={handleChangeLugar}
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{backgroundColor: '#145572'}}
                >
                  Guardar ciudad editada.
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

export default Ciudad;
