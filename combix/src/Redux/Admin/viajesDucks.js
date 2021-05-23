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

export const registrarViaje = (ruta, fecha, precio) => (dispatch) => {
  const viaje = {
    ruta,
    fecha,
    precio,
  };

  Axios.post('http://localhost:8080/travels', viaje).then((response) => {
    switch (response.status) {
      case 202:
        alert(response.data);
        traerViajes()
          .then((response) => {
            switch (response.status) {
              case 200:
                dispatch({
                  type: REGISTRAR_VIAJES,
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
        break;
      default:
        alert(response.data);
        break;
    }
  });
};

export const cargarViajes = () => (dispatch, getState) => {
  traerViajes()
    .then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: CARGAR_VIAJES,
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

export const borrarViaje = (id) => (dispatch) => {
  Axios.delete('http://localhost:8080/travels/' + id, {
    params: {id: id},
  })
    .then((response) => {
      switch (response.status) {
        case 200:
          alert(response.data);
          traerViajes()
            .then((response) => {
              switch (response.status) {
                case 200:
                  dispatch({
                    type: BORRAR_VIAJES,
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
export const editarViaje = (ruta, fecha, precio, idVieja) => (dispatch) => {
  const viaje = {
    ruta,
    fecha,
    precio,
  };

  Axios.put('http://localhost:8080/travels/' + idVieja, {
    params: {id: idVieja},
    viaje,
  })
    .then((response) => {
      switch (response.status) {
        case 202:
          alert(response.data);
          traerViajes()
            .then((response) => {
              switch (response.status) {
                case 200:
                  dispatch({
                    type: EDITAR_VIAJES,
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

async function traerViajes() {
  return await Axios.get('http://localhost:8080/travels', {})
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
