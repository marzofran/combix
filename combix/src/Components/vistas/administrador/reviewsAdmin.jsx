import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Review from './elementos/review';
import {obtenerReviews} from '../../../Redux/combixDucks';

//Implementado, falta cargar
const ReviewsAdmin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerReviews());
  }, [dispatch]);

  const reviews = useSelector((store) => store.combix.reviews);

  return (
    <div className={'col'}>
      <div className={'viajes-admin'}>
        <div className='row'>
          <div className='col'>
            <h3 style={{color: '#357185', padding: '5px 10px'}}>Lo que dicen los usuarios</h3>
          </div>
        </div>
        <div className='col'>
          {reviews.map((item) => (
            <Review item={item} key={item._id}></Review>
          ))}
        </div>
      </div>
    </div>
  )

};

export default ReviewsAdmin;