import Axios from 'axios';
const configDuck = {
  elementos: [],
};
const BUSCAR_VIAJES = 'BUSCAR_VIAJES';
const VALIDAR_DISPONIBILIDAD = 'VALIDAR_DISPONIBILIDAD'

export default function reducer(state = configDuck, action) {
  switch (action.type) {
    case BUSCAR_VIAJES:
      return {...state, elementos: action.payload};
    case VALIDAR_DISPONIBILIDAD:
      return {...state, elementos: action.payload};
    default:
      return state;
  }
}

export const buscarViajes = (fecha, origen, destino) => (dispatch) => {
    const values = {
        fecha,
        origen,
        destino,
    };

    traerViajesValidos(values)
        .then((response) => {
        switch (response.status) {
            case 200:
            dispatch({
                type: BUSCAR_VIAJES,
                payload: response.data,
            });
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

export const validarDisponibilidad = (cantidadAsientos) => (dispatch) => {
    //Ver despues
}

async function traerViajesValidos(values) {
    return await Axios.post('http://localhost:8080/travels/search', values)
        .then((response) => {
            return response;
        })
        .catch(function (error) {
            return error;
        });
}

async function contarPasajesVendidos() {
    //Ver despues
}