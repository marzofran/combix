import Axios from 'axios';
import {Alert} from 'react-bootstrap';
import history from '../Components/history';
const configDuck = {
  elementos: {
    pendientes: [],
    enCurso: [],
    finalizado: [],
  },
  sesionCompra: {},
  pasajesSeleccionado: [],
};

const CARGAR_VIAJES_CHOFER = 'CARGAR_VIAJES_CHOFER';
const SELECCIONAR_VIAJE = 'SELECCIONAR_VIAJE';
const COMPLETAR_TEST = 'COMPLETAR_TEST';
const CARGAR_PASAJES_VIAJE_CHOFER = 'CARGAR_PASAJES_VIAJE_CHOFER';
const LOGEAR_DATOS_USUARIO = 'LOGEAR_DATOS_USUARIO';
export default function reducerChoferLogeado(state = configDuck, action) {
  switch (action.type) {
    case CARGAR_VIAJES_CHOFER:
      return {...state, elementos: action.payload};
    case SELECCIONAR_VIAJE:
      return {...state, seleccionado: action.payload};
    case CARGAR_PASAJES_VIAJE_CHOFER:
      return {...state, pasajesSeleccionado: action.payload};
    case LOGEAR_DATOS_USUARIO:
      return {...state, sesionCompra: action.payload};
    case COMPLETAR_TEST:
      return state;
    default:
      return state;
  }
}
export const cargarViajesChofer = (id) => (dispatch, getState) => {
  traerViajes(id).then((viajes) => {
    switch (viajes.status) {
      case 200:
        let viajesArray = {
          pendientes: [],
          finalizado: [],
          enCurso: [],
          seleccionado: {},
        };
        viajes.data.forEach((viaje) => {
          if (viaje.estado === 'pendiente') {
            viajesArray.pendientes.push(viaje);
          } else if (viaje.estado === 'enCurso') {
            viajesArray.enCurso.push(viaje);
          } else {
            viajesArray.finalizado.push(viaje);
          }
        });

        dispatch({
          type: CARGAR_VIAJES_CHOFER,
          payload: viajesArray,
        });
        break;
      default:
        alert(viajes);
        break;
    }
  });
};
export const seleccionarViaje = (viaje) => (dispatch, getState) => {
  dispatch({
    type: SELECCIONAR_VIAJE,
    payload: viaje,
  });
  history.push('/chofer/viaje');
};
export const completarTest = (id, estado) => (dispatch, getState) => {
  Axios.put('http://localhost:8080/tickets/' + id, {estado})
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
  dispatch({
    type: COMPLETAR_TEST,
  });
};

async function traerViajes(id) {
  return await Axios.get('http://localhost:8080/travels/' + id, {})
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
export const cargarPasajesViajeChofer = (id) => (dispatch) => {
  Axios.get('http://localhost:8080/tickets/viaje/' + id, {
    id,
  }).then((response) => {
    switch (response.status) {
      case 200:
        dispatch({
          type: CARGAR_PASAJES_VIAJE_CHOFER,
          payload: response.data,
        });

        break;
      default:
        alert(response.data);
        console.log(response);
        break;
    }
  });
};

export const logearUsuario = (mail, dni) => (dispatch) => {
  Axios.post('http://localhost:8080/users/chofer/' + mail, {dni})
    .then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: LOGEAR_DATOS_USUARIO,
            payload: response.data,
          });
          history.push('/chofer/viaje/checkOut');

          break;
        default:
          alert('No se encontro al usuario');
          break;
      }
    })
    .catch((err) => {
      Alert(err.response.data);
    });
};
