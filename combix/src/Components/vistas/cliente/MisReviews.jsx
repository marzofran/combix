import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Review from './elementos/review';
import { obtenerReviewsUsuario, crearReview } from '../../../Redux/clienteDucks';

const MisReviews = () => {
  
  const dispatch = useDispatch();
  const sesion = useSelector((state) => state.combix.sesion);

  const reviews = useSelector((state) => state.cliente.misReviews)
  const [contenido, setContenido] = useState('');

  useEffect(() => {
    dispatch(obtenerReviewsUsuario());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeContenido = (e) => {
    setContenido(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(crearReview(contenido, sesion));
  };

  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col-9'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}>Mis Reviews</h3>
          </div>
          <div className='col'>
            <button
              type='button'
              style={{ backgroundColor: '#145572' }}
              className={'btn btn-primary btn-block'}
              data-toggle='modal'
              data-target='#exampleModal'
            >
              + Escribir nueva review
            </button>
          </div>
        </div>
      <div className='col'>
        {reviews.map((item) => (
            <Review item={item} key={item._id}></Review>
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
              Crear review
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
                <label htmlFor='nombre'>Escriba el texto del review</label>
                <textarea
                  required
                  value={contenido}
                  type='text'
                  className='form-control'
                  id='contenido'
                  aria-describedby='contenido'
                  onChange={handleChangeContenido}
                  style={{ wordBreak: 'break-word'}}
                ></textarea>
              </div>
              <button
                type='submit'
                className='btn btn-primary'
                style={{ backgroundColor: '#145572' }}
              >
                Enviar review
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

export default MisReviews;
