import Axios from 'axios';
import { Alert } from 'react-bootstrap';
import history from '../Components/history';
const configDuck = {
  elementos: {
    pendientes: [],
    enCurso: [],
    finalizado: [],
  },
  sesionCompra: {},
  pasajesSeleccionado: [],
  disponibilidad: {},
  pasajeChequeoCovid: {},
};

const CARGAR_VIAJES_CHOFER = 'CARGAR_VIAJES_CHOFER';
const SELECCIONAR_VIAJE = 'SELECCIONAR_VIAJE';
const COMPLETAR_TEST = 'COMPLETAR_TEST';
const CARGAR_PASAJES_VIAJE_SELECCIONADO = 'CARGAR_PASAJES_VIAJE_SELECCIONADO';
const LOGEAR_DATOS_USUARIO = 'LOGEAR_DATOS_USUARIO';
const CARGAR_DISPONIBILIDAD = 'CARGAR_DISPONIBILIDAD';
const COMPRAR_PASAJE_CHOFER = 'COMPRAR_PASAJE_CHOFER';
const SELECCIONAR_UNPASAJE_CHOFER = ' SELECCIONAR_UNPASAJE_CHOFER';
const REGISTRAR_USUARIO_COMO_CHOFER = 'REGISTRAR_USUARIO_COMO_CHOFER';
const ABRIR_VIAJE = 'ABRIR_VIAJE';
const COMENZAR_VIAJE = 'COMENZAR_VIAJE';
const FINALIZAR_VIAJE = 'FINALIZAR_VIAJE';

export default function reducerChoferLogeado(state = configDuck, action) {
  switch (action.type) {
    case CARGAR_VIAJES_CHOFER:
      return { ...state, elementos: action.payload };
    case SELECCIONAR_VIAJE:
      return { ...state, seleccionado: action.payload };
    case CARGAR_PASAJES_VIAJE_SELECCIONADO:
      return {
        ...state,
        pasajesSeleccionado: action.payload.primero,
        disponibilidad: action.payload.segundo,
      };
    case LOGEAR_DATOS_USUARIO:
      return {
        ...state,
        sesionCompra: action.payload,
      };
    case CARGAR_DISPONIBILIDAD:
      return { ...state, disponibilidad: action.payload };
    case COMPLETAR_TEST:
      return state;
    case COMPRAR_PASAJE_CHOFER:
      return { ...state, pasajeChequeoCovid: action.payload };
    case SELECCIONAR_UNPASAJE_CHOFER:
      return { ...state, pasajeChequeoCovid: action.payload };
    case REGISTRAR_USUARIO_COMO_CHOFER:
      return { ...state, sesionCompra: action.payload };
    case ABRIR_VIAJE:
      return {...state, elementos: action.payload};
    case COMENZAR_VIAJE:
      return {...state, elementos: action.payload};
    case FINALIZAR_VIAJE:
      return {...state, elementos: action.payload};
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
          } else if (
            viaje.estado === 'finalizado' ||
            viaje.estado === 'cancelado'
          ) {
            viajesArray.finalizado.push(viaje);
          } else {
            viajesArray.enCurso.push(viaje);
          }
        });

        dispatch({
          type: CARGAR_VIAJES_CHOFER,
          payload: {primero: viajesArray, segundo: viajeEnCurso}
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

export const completarTest =
  (id, estado, redirect, idUsuario, patch) => (dispatch, getState) => {
    Axios.put('http://localhost:8080/tickets/' + id, { estado })
      .then((response) => {
        if (redirect) {
          history.push(patch);
          if (estado === 'cancelado') {
            let hoyMas2Semanas = new Date(Date.now() + 12096e5);
            hoyMas2Semanas = hoyMas2Semanas.getTime() / 1000 / 3600;
            Axios.put(
              'http://localhost:8080/users/' + idUsuario + '/banear'
            ).then((response) => {
              Axios.get('http://localhost:8080/tickets/' + idUsuario).then(
                (response) => {
                  response.data.forEach((e) => {
                    let fechaViaje = Date.parse(e.viaje.fecha);
                    fechaViaje = fechaViaje / 1000 / 3600;
                    let horaViaje = e.viaje.ruta.horario;
                    horaViaje = horaViaje.split(':', 2);
                    horaViaje =
                      parseInt(horaViaje[0]) + parseFloat(horaViaje[1] / 60);
                    fechaViaje = fechaViaje + horaViaje;
                    if (fechaViaje < hoyMas2Semanas) {
                      Axios.put('http://localhost:8080/tickets/' + e._id, {
                        estado,
                      });
                    }
                  });
                }
              );
            });
          }
        }
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
export const cargarPasajesViajeSeleccionado = (id, viaje) => (dispatch) => {
  Axios.get('http://localhost:8080/tickets/viaje/' + id, {
    id,
  }).then((response) => {
    switch (response.status) {
      case 200:
        var ordering = {},
          sortOrder = ['aceptado', 'pendiente', 'ausente', 'cancelado'];
        for (var i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;

        response.data.sort(function (a, b) {
          return (
            ordering[a.estado] - ordering[b.estado] ||
            a.cantidadPasajes - b.cantidadPasajes
          );
        });

        let totalPasajes = 0;
        response.data.forEach((e) => {
          totalPasajes = totalPasajes + e.cantidadPasajes;
        });
        let disponibilidad = viaje.ruta.combi.cantidadAsientos;
        disponibilidad = disponibilidad - totalPasajes;

        dispatch({
          type: CARGAR_PASAJES_VIAJE_SELECCIONADO,
          payload: { primero: response.data, segundo: disponibilidad },
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
  Axios.post('http://localhost:8080/users/chofer/' + mail, { dni })
    .then((response) => {
      switch (response.status) {
        case 200:
          dispatch({
            type: LOGEAR_DATOS_USUARIO,
            payload: response.data,
          });
          history.push('/chofer/checkOut');

          break;
        default:
          alert('No se encontro al usuario');
          break;
      }
    })
    .catch((err) => {
      alert('No se encontro al usuario');
    });
};

export const actualizarDisponibilidad = (disponibilidad) => (dispatch) => {
  dispatch({
    type: CARGAR_DISPONIBILIDAD,
    payload: disponibilidad,
  });
};

export const comprarPasajeChofer =
  (viaje, usuario, cantidadAsientos, precioTotal) => (dispatch) => {
    delete viaje['disponibilidad'];
    const pasaje = {
      viaje,
      usuario,
      cantidadAsientos,
      precioTotal,
      insumos: [],
    };
    Axios.post('http://localhost:8080/tickets', {
      pasaje,
    }).then((response) => {
      switch (response.status) {
        case 202:
          const pasaje = response.data;
          pasaje.CompradoPor = 'chofer';
          dispatch({
            type: COMPRAR_PASAJE_CHOFER,
            payload: pasaje,
          });
          history.push('./covid');

          break;
        default:
          alert('Error al realizar la compra');
          break;
      }
    });
  };

export const seleccionarUnPasajero = (user) => (dispatch) => {
  dispatch({
    type: SELECCIONAR_UNPASAJE_CHOFER,
    payload: user,
  });
};

export const registrarUsuarioChofer = (newUser) => (dispatch, getState) => {
  newUser.clave = 'password123';
  Axios.post('http://localhost:8080/users', newUser).then((response) => {
    switch (response.status) {
      case 202:
        alert('El registro fue exitoso');
        dispatch({
          type: REGISTRAR_USUARIO_COMO_CHOFER,
          payload: response.data,
        });
        history.push('/chofer/checkOut');
        break;
      case 203:
        alert('El email ya está registrado');
        break;
      default:
        alert('Hubo un error con el registro');
        break;
    }
  });
};

export const abrirViaje = (idVieja) => (dispatch) => {
  Axios.put('http://localhost:8080/travels/abrir/' + idVieja, {
    params: {id: idVieja},
  })
    .then((response) => {
      switch (response.status) {
        case 202:
                  dispatch({
                    type: ABRIR_VIAJE,
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

export const comenzarViaje = (idVieja) => (dispatch) => {
  Axios.put('http://localhost:8080/travels/comenzar/' + idVieja, {
    params: {id: idVieja},
  })
    .then((response) => {
      switch (response.status) {
        case 202:
                  dispatch({
                    type: COMENZAR_VIAJE,
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

export const finalizarViaje = (idVieja) => (dispatch) => {
  Axios.put('http://localhost:8080/travels/finalizar/' + idVieja, {
    params: {id: idVieja},
  })
    .then((response) => {
      switch (response.status) {
        case 202:
                  dispatch({
                    type: FINALIZAR_VIAJE,
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

