import Axios from 'axios';
import history from '../Components/history';
const configDuck = {
  sesion: {},
  elementos: [],
};
const BUSCAR_VIAJES = 'BUSCAR_VIAJES';
const VALIDAR_DISPONIBILIDAD = 'VALIDAR_DISPONIBILIDAD';
const CREAR_PASAJE = 'CREAR_PASAJE';
const CARGAR_PASAJES = 'CARGAR_PASAJES';
const ACTIVAR_GOLD = 'ACTIVAR_GOLD';
const CANCELAR_GOLD = 'CANCELAR_GOLD';


export default function reducer(state = configDuck, action) {
  switch (action.type) {
    case BUSCAR_VIAJES:
      return {...state, elementos: action.payload};
    case CREAR_PASAJE:
      return state;
    case ACTIVAR_GOLD:
      return {...state, sesion: action.payload};
    case CANCELAR_GOLD:
      return {...state, sesion: action.payload};
    case VALIDAR_DISPONIBILIDAD:
      return {...state, elementos: action.payload};
    case CARGAR_PASAJES:
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
            let viajes = response.data;

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
            alert(response.data);

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
        case 202:
          dispatch({
            type: CREAR_PASAJE,
          });
          history.push('./compraExitosa');

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

export const cargarPasajes = (id) => (dispatch) => {
  Axios.get('http://localhost:8080/tickets/' + id, {
    id,
  }).then((response) => {
    switch (response.status) {
      case 200:
        dispatch({
          type: CARGAR_PASAJES,
          payload: response.data,
        });

        break;
      default:
        alert(response.data);
        console.log(response);
        break;
    }
  });
}

export const activarGold = (id) => (dispatch) => {
  Axios.put('http://localhost:8080/users/' + id + '/gold')
  .then((response) => {
    switch (response.status) {
      case 200:
        dispatch({
          type: ACTIVAR_GOLD,
          payload: response.data,
        });
        alert('El usuario ahora es GOLD!')
        break;
      default:
        alert(response.data);
        break;
    }
  });
}

export const cancelarGold = (id) => (dispatch) => {
  Axios.put('http://localhost:8080/users/' + id + '/cancelargold')
  .then((response) => {
    switch (response.status) {
      case 200:
        dispatch({
          type: CANCELAR_GOLD,
          payload: response.data,
        });
        alert('Se cancelo exitosamente la subscripcion a GOLD!')
        break;
      default:
        alert(response.data);
        break;
    }
  });
}