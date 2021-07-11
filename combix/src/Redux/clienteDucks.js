import Axios from 'axios';
import history from '../Components/history';
const configDuck = {
  resultadoBusqueda: [],
  elementos: [],
  misReviews: [],
};
const BUSCAR_VIAJES = 'BUSCAR_VIAJES';
const VALIDAR_DISPONIBILIDAD = 'VALIDAR_DISPONIBILIDAD';
const CREAR_PASAJE = 'CREAR_PASAJE';
const CARGAR_PASAJES = 'CARGAR_PASAJES';
const RECUPERAR_CONTRASEÑA = 'RECUPERAR_CONTRASEÑA ';
const ELIMINAR_PASAJE = 'ELIMINAR_PASAJE';
const OBTENER_REVIEWS_USUARIO = 'OBTENER_REVIEWS_USUARIO';
const CREAR_REVIEW = 'CREAR_REVIEW';
const MODIFICAR_REVIEW = 'MODIFICAR_REVIEW';
const ELIMINAR_REVIEW = 'ELIMINAR_REVIEW';

export default function reducer(state = configDuck, action) {
  switch (action.type) {
    case BUSCAR_VIAJES:
      return {...state, resultadoBusqueda: action.payload};
    case CREAR_PASAJE:
      return state;
    case VALIDAR_DISPONIBILIDAD:
      return {...state, elementos: action.payload};
    case CARGAR_PASAJES:
      return {...state, elementos: action.payload};
    case RECUPERAR_CONTRASEÑA:
      return state;
    case ELIMINAR_PASAJE:
      return state;
    case OBTENER_REVIEWS_USUARIO:
      return { ...state, misReviews: action.payload};
    case CREAR_REVIEW:
      return state;
    case MODIFICAR_REVIEW:
      return state;
    case ELIMINAR_REVIEW:
      return state;
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
            let viajes = response.data.sort((a, b) =>
              a.ruta.combi.tipo.localeCompare(b.ruta.combi.tipo)
            );

            if (superComoda === 'true') {
              viajes = viajes.reverse();
            }
            dispatch({
              type: BUSCAR_VIAJES,
              payload: viajes,
            });

            history.push('./resultado');
            break;
          case 404:
            alert('No se encontraron viajes');

            break;
          default:
            alert('No se encontraron viajes');
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
};

export const cancelarPasaje = (id, _idUsuario) => (dispatch) => {
  Axios.delete('http://localhost:8080/tickets/' + id, {params: id}).then(
    (response) => {
      switch (response.status) {
        case 200:
          Axios.get('http://localhost:8080/tickets/' + _idUsuario, {
            _idUsuario,
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
          dispatch({
            type: ELIMINAR_PASAJE,
            payload: response.data,
          });
          alert('Reembolso efectuado correctamente');
          break;
        default:
          alert(response.data);
          break;
      }
    }
  );
};

export const recuperarContraseña = (mail) => (dispatch) => {
  Axios.get('http://localhost:8080/users/' + mail).then((response) => {
    switch (response.status) {
      case 200:
        dispatch({
          type: RECUPERAR_CONTRASEÑA,
        });
        history.push({
          pathname: '/mailEnviado',
          state: {mail: mail},
        });
        break;
      default:
        alert(response.data);
        break;
    }
  });
};

export const obtenerReviewsUsuario = (id) => (dispatch) => {
  Axios.get('http://localhost:8080/reviews/' + id, {
    id,
  }).then((response) => {
    switch (response.status) {
      case 200:
        dispatch({
          type: OBTENER_REVIEWS_USUARIO,
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

export const crearReview = (contenido, usuario) => (dispatch) => {
  const review = {
    contenido,
    usuario,
  }
  Axios.post('http://localhost:8080/reviews/', review).then(
    (response) => {
      switch (response.status) {
        case 200:
          Axios.get('http://localhost:8080/reviews/' + usuario._id, {
            id: usuario._id,
          }).then((response) => {
            switch (response.status) {
              case 200:
                dispatch({
                  type: OBTENER_REVIEWS_USUARIO,
                  payload: response.data,
                });

                break;
              default:
                alert(response.data);
                console.log(response);
                break;
            }
          });
          dispatch({
            type: CREAR_REVIEW,
            payload: response.data,
          });
          alert('Se guardó el review correctamente');
          break;
        default:
          alert(response.data);
          break;
      }
    }
  );
};

export const modificarReview = (contenido, usuario, fecha, id) => (dispatch) => {
  const review = {
    contenido,
    usuario,
    fecha,
  }
  Axios.put('http://localhost:8080/reviews/' + id, {
    review,
    params: {
      id,
    }
  }).then(
    (response) => {
      switch (response.status) {
        case 200:
          Axios.get('http://localhost:8080/reviews/' + usuario._id, {
            id: usuario._id,
          }).then((response) => {
            switch (response.status) {
              case 200:
                dispatch({
                  type: OBTENER_REVIEWS_USUARIO,
                  payload: response.data,
                });

                break;
              default:
                alert(response.data);
                console.log(response);
                break;
            }
          });
          dispatch({
            type: MODIFICAR_REVIEW,
            payload: response.data,
          });
          alert('Se modificó el review correctamente');
          break;
        default:
          alert(response.data);
          break;
      }
    }
  );
};

export const eliminarReview = (id, usuario) => (dispatch) => {
  Axios.delete('http://localhost:8080/reviews/' + id, {id}
  ).then((response) => {
      switch (response.status) {
        case 200:
          Axios.get('http://localhost:8080/reviews/' + usuario._id, {
            id: usuario._id,
          }).then((response) => {
            switch (response.status) {
              case 200:
                dispatch({
                  type: OBTENER_REVIEWS_USUARIO,
                  payload: response.data,
                });

                break;
              default:
                alert(response.data);
                console.log(response);
                break;
            }
          });
          dispatch({
            type: ELIMINAR_REVIEW,
            payload: response.data,
          });
          alert('Se eliminó el review correctamente');
          break;
        default:
          alert(response.data);
          break;
      }
    }
  );
};
