import Axios from 'axios';
const configDuck = {
  elementos: [],
};
const CARGAR_VIAJES = 'CARGAR_VIAJES';
const EDITAR_VIAJES = 'EDITAR_VIAJES';
const BORRAR_VIAJES = 'BORRAR_VIAJES';
const REGISTRAR_VIAJES = 'REGISTRAR_VIAJES';

export default function reducer(state = configDuck, action) {
  switch (action.type) {
    case CARGAR_VIAJES:
      return {...state, elementos: action.payload};
    case EDITAR_VIAJES:
      return {...state, elementos: action.payload};
    case BORRAR_VIAJES:
      return {...state, elementos: action.payload};
    case REGISTRAR_VIAJES:
      return {...state, elementos: action.payload};
    default:
      return state;
  }
}

export const registrarViaje = (ruta, fecha, precio) => () => {
  const viaje = {
    ruta,
    fecha,
    precio,
  };

  Axios.post('http://localhost:8080/travels', viaje).then((response) => {
    switch (response.status) {
      case 202:
        alert('Se registro el viaje con exito');
        break;
      case 203:
        alert('El viaje ya se encuentra registrado');
        break;
      default:
        alert('Hubo un error con el registro del del viaje');
        break;
    }
  });
};

export const cargarViajes = () => (dispatch, getState) => {
  try {
    Axios.get('http://localhost:8080/travels').then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: CARGAR_VIAJES,
            payload: response.data,
          });
          break;
        default:
          alert('Ocurrio un error');
          break;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const borrarViaje = (id) => (dispatch) => {
  try {
    Axios.delete('http://localhost:8080/travels/' + id, {
      data: {id: id},
    }).then((response) => {
      switch (response.status) {
        case 200:
          console.log(response);
          alert('Se elimino el viaje con exito');
          break;
        default:
          alert('Ocurrio un error');
          break;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export const editarViaje = (ruta, fecha, precio, idVieja) => (dispatch) => {
  const viaje = {
    ruta,
    fecha,
    precio,
  };
  try {
    Axios.put('http://localhost:8080/travels/' + idVieja, {
      params: {id: idVieja},
      viaje,
    }).then((response) => {
      switch (response.status) {
        case 200:
          alert('Se modifico el viaje con exito');
          break;
        default:
          alert('Ocurrio un error');
          break;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
