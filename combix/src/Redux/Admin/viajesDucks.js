import Axios from 'axios';
const configDuck = {
  elementos: [],
  estadisticas: [],
};
const CARGAR_VIAJES_ADMIN = 'CARGAR_VIAJES_ADMIN';
const EDITAR_VIAJES = 'EDITAR_VIAJES';
const BORRAR_VIAJES = 'BORRAR_VIAJES';
const REGISTRAR_VIAJES = 'REGISTRAR_VIAJES';
const DAR_DE_ALTA_VIAJE = 'DAR_DE_ALTA_VIAJE';
const BORRADO_FISICO_VIAJE = 'BORRADO_FISICO_VIAJE';
const CARGAR_ESTADISTICAS_ADMIN = 'CARGAR_ESTADISTICAS_ADMIN';

export default function reducer(state = configDuck, action) {
  switch (action.type) {
    case CARGAR_VIAJES_ADMIN:
      return { ...state, elementos: action.payload };
    case EDITAR_VIAJES:
      return { ...state, elementos: action.payload };
    case BORRAR_VIAJES:
      return { ...state, elementos: action.payload };
    case REGISTRAR_VIAJES:
      return { ...state, elementos: action.payload };
    case DAR_DE_ALTA_VIAJE:
      return { ...state, elementos: action.payload };
    case BORRADO_FISICO_VIAJE:
      return { ...state, elementos: action.payload };
    case CARGAR_ESTADISTICAS_ADMIN:
      return { ...state, estadisticas: action.payload };
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
            type: CARGAR_VIAJES_ADMIN,
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
    params: { id: id },
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
    params: { id: idVieja },
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
export const darDeAltaViaje = (id, viaje) => (dispatch) => {
  Axios.put('http://localhost:8080/travels/darDeAlta/' + id, {
    params: { id: id },
    viaje,
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
                    type: DAR_DE_ALTA_VIAJE,
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
export const borradoFisicoViajes = (id) => (dispatch) => {
  Axios.get('http://localhost:8080/tickets/viaje/' + id, {
    id,
  }).then((response) => {
    console.log(response.data);
    switch (response.status) {
      case 200:
        if (response.data.length > 0) {
          alert('No se puede borrar el viaje por que tiene pasajes comprados');
        } else {
          Axios.delete(
            'http://localhost:8080/travels/borradoFisico/' + id
          ).then((response) => {
            switch (response.status) {
              case 200:
                traerViajes().then((choferes) => {
                  switch (choferes.status) {
                    case 200:
                      dispatch({
                        type: BORRADO_FISICO_VIAJE,
                        payload: choferes.data,
                      });
                      alert('El viaje fue eliminada fisicamente con exito');
                      break;
                    default:
                      console.log(choferes.data);
                      break;
                  }
                });
                break;
              default:
                alert('ocurrio un error');
                break;
            }
          });
        }

        break;
      default:
        alert('Ocurrio un error');
        break;
    }
  });
};
export const cargarEstadisticas = (inicio, fin) => (dispatch) => {
  let viajesSeleccionados = [];
  traerViajes()
    .then((response) => {
      switch (response.status) {
        case 200:
          response.data.forEach((e) => {
            let fechaViaje = Date.parse(e.fecha);
            if (fechaViaje > inicio && fechaViaje < fin) {
              if (e.estado === 'finalizado') {
                let id = e._id;
                Axios.get('http://localhost:8080/tickets/viaje/' + id, {
                  id,
                }).then((responseDos) => {
                  switch (responseDos.status) {
                    case 200:
                      responseDos.data.forEach((pasaje) => {
                        e.pasajeros.push(pasaje);
                      });

                      viajesSeleccionados.push(e);
                      //cargarEstadisticasAPayload(dispatch, viajesSeleccionados);
                      break;
                    default:
                      alert('Ocurrio un error');
                      break;
                  }
                });
              }
            }
          });

          setTimeout(function () {
            if (viajesSeleccionados.length < 1) {
              alert('no hay viajes con esos parametros');
              cargarEstadisticasAPayload(dispatch, viajesSeleccionados);
            } else {
              cargarEstadisticasAPayload(dispatch, viajesSeleccionados);
            }
          }, 3000);
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

function cargarEstadisticasAPayload(dispatch, viajesSeleccionados) {
  console.log(viajesSeleccionados);
  dispatch({
    type: CARGAR_ESTADISTICAS_ADMIN,
    payload: viajesSeleccionados,
  });
}
