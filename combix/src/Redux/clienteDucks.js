import Axios from 'axios';
import history from '../Components/history';
const configDuck = {
  elementos: [],
};
const BUSCAR_VIAJES = 'BUSCAR_VIAJES';
const VALIDAR_DISPONIBILIDAD = 'VALIDAR_DISPONIBILIDAD';
const CREAR_PASAJE = 'CREAR_PASAJE';

export default function reducer(state = configDuck, action) {
  switch (action.type) {
    case BUSCAR_VIAJES:
      return {...state, elementos: action.payload};
    case CREAR_PASAJE:
      return state;
    case VALIDAR_DISPONIBILIDAD:
      return {...state, elementos: action.payload};
    default:
      return state;
  }
}

export const buscarViajes =
  (fecha, origen, destino, superComoda) => (dispatch) => {
    const values = {
      fecha,
      origen,
      destino,
    };

    traerViajesValidos(values)
      .then((response) => {
        switch (response.status) {
          case 200:
            let viajes = response.data
            if (superComoda === 'true') {
              viajes = response.data
                .sort((a, b) => a.combi.tipo.localeCompare(b.combi.tipo))
                .reverse();
            }
            dispatch({
              type: BUSCAR_VIAJES,
              payload: viajes,
            });
            alert(response.data);
            history.push('./resultado');
            break;
          case 404:
            alert(response)
            break;
          default:
            alert(response.data);
            break;
        }
      })
      .catch(function (err) {
        alert(err);
      });
  };

export const crearPasaje =
  (viaje, usuario, cantidadAsientos, insumos, precioTotal) => (dispatch) => {
    delete viaje['disponibilidad'];
    const pasaje = {
      viaje,
      usuario,
      cantidadAsientos,
      precioTotal,
      insumos,
    };

    Axios.post('http://localhost:8080/tickets', {
      pasaje,
    }).then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: CREAR_PASAJE,
          });
          alert(response.data);
          break;
        default:
          alert(response.data);
          break;
      }
    });
  };

async function traerViajesValidos(values) {
  return await Axios.post('http://localhost:8080/travels/search', values)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

async function disponible(viaje, cantidadPasajeros) {
  const disponibilidad = await Axios.post(
    'http://localhost:8080/travels/disp',
    viaje
  );
  return disponibilidad >= cantidadPasajeros;
}
