import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Viaje from './elementos/viaje';
import BuscarForm from './elementos/buscar';
import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {cargarViajes} from '../../../Redux/Admin/viajesDucks';
const Resultado = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  const viajesResultado = useSelector(
    (store) => store.cliente.resultadoBusqueda
  );
  return (
    <div>
      <div className='bg-image-pasaje'>
        <Container>
          <div className='pt-3 pb-5'>
            <Link to='/client/buscarPasajes' className='text-white '>
              <h2>Volver</h2>
            </Link>
            <BuscarForm></BuscarForm>
          </div>
        </Container>
      </div>

      <Container>
        <div className='mt-3'>
          <h2 className='mb-3'>Resultados de la busqueda</h2>
          {viajesResultado.map((item) => (
            <Viaje item={item} key={item._id}></Viaje>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Resultado;
