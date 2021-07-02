import Axios from 'axios';
import history from '../Components/history';
const configDuck = {
  elementos: {
    pendientes: [],
    enCurso: [],
    finalizado: [],
  },
};

const CARGAR_VIAJES = 'CARGAR_VIAJES';
export default function reducerChoferLogeado(state = configDuck, action) {
  switch (action.type) {
    case CARGAR_VIAJES:
      return {...state, elementos: action.payload};
    default:
      return state;
  }
}
export const cargarViajes = (id) => (dispatch, getState) => {
  traerViajes(id).then((viajes) => {
    switch (viajes.status) {
      case 200:
        let viajesArray = {
          pendientes: [],
          finalizado: [],
          enCurso: [],
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
          type: CARGAR_VIAJES,
          payload: viajesArray,
        });
        break;
      default:
        alert(viajes);
        break;
    }
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
